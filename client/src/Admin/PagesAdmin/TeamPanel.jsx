import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaEdit, FaPlus, FaTrash, FaUsers } from "react-icons/fa";
import axios from "axios";
import "../DesignAdmin/TeamPanel.css";

const TeamPanel = () => {
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/team/teams");
      setTeams(res.data);
    } catch (err) {
      message.error("Failed to fetch teams.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/team/delete-teams/${id}`);
      message.success("Team member deleted successfully.");
      fetchTeams();
    } catch (err) {
      message.error("Error deleting team member.");
    }
  };

  const handleAddEdit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("position", values.position);

    if (values.file?.[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    try {
      const method = values._id ? "PUT" : "POST";
      const url = values._id
        ? `http://localhost:5000/api/team/edit-teams/${values._id}`
        : "http://localhost:5000/api/team/create-teams";

      await axios({ method, url, data: formData, headers: { "Content-Type": "multipart/form-data" } });

      message.success(values._id ? "Team updated successfully!" : "Team added successfully!");
      fetchTeams();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save team member.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Position", dataIndex: "position", key: "position" },
    {
      title: "Image",
      dataIndex: "url",
      key: "url",
      render: (url) => (url ? <img src={url} alt="Team" style={{ width: 50 }} /> : "No Image"),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            className="edit-btn-team"
            onClick={() => {
              form.setFieldsValue({ ...record, file: [] });
              setIsModalOpen(true);
            }}
          >
            <FaEdit /> Edit
          </Button>
          <Button className="del-btn-team" type="primary" danger onClick={() => handleDelete(record._id)}>
            <FaTrash /> Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="Team-container">
      <h1><FaUsers />Teams</h1>
      <Button
        type="primary"
        className="add-btn-team"
        onClick={() => {
          form.resetFields();
          setIsModalOpen(true);
        }}
      >
        <FaPlus />Add Team Member
      </Button>
      <Table columns={columns} dataSource={teams} rowKey="_id" pagination={{pageSize: 6}}/>

      <Modal
        title="Add/Edit Team Member"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} onFinish={handleAddEdit} layout="vertical">
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="position" label="Position" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="file" label="Image" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList || []}>
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamPanel;
