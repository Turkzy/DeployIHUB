import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaEdit, FaPlus, FaTrash, FaUsers } from "react-icons/fa";
import axios from "axios";
import "../DesignAdmin/TeamPanel.css";

const TeamPanel = () => {
  const [teams, setTeams] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
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

  const handleAddTeam = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("position", values.position);

    if (values.file?.[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    try {
      await axios.post("http://localhost:5000/api/team/create-teams", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Team added successfully!");
      fetchTeams();
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      message.error("Failed to add team member.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTeam = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("position", values.position);

    if (values.file?.[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    try {
      await axios.put(`http://localhost:5000/api/team/edit-teams/${selectedTeam._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Team updated successfully!");
      fetchTeams();
      setIsEditModalOpen(false);
      editForm.resetFields();
    } catch (error) {
      message.error("Failed to update team member.");
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
              setSelectedTeam(record);
              editForm.setFieldsValue({ ...record, file: [] });
              setIsEditModalOpen(true);
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
      <h1><FaUsers /> Teams</h1>
      <Button
        type="primary"
        className="add-btn-team"
        onClick={() => {
          addForm.resetFields();
          setIsAddModalOpen(true);
        }}
      >
        <FaPlus /> Add Team Member
      </Button>
      <Table columns={columns} dataSource={teams} rowKey="_id" pagination={{ pageSize: 10 }} />

      {/* Add Modal */}
      <Modal
        title="Add New Team Member"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={() => addForm.submit()}
        confirmLoading={loading}
      >
        <Form form={addForm} onFinish={handleAddTeam} layout="vertical">
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

      {/* Edit Modal */}
      <Modal
        title="Edit Team Member"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={() => editForm.submit()}
        confirmLoading={loading}
      >
        <Form form={editForm} onFinish={handleEditTeam} layout="vertical">
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
