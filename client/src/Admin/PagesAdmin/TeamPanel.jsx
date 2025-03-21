import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaEdit, FaPlus, FaTrash} from "react-icons/fa";
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
      const res = await axios.get("https://projectihub-cloud-database.onrender.com/api/team/teams");
      setTeams(res.data);
    } catch (err) {
      message.error("Failed to fetch teams.");
    }
  };

  const handleDelete = async (id, teamName) => {
    if (!window.confirm("Are you sure you want to delete this team member?"))
      return;
    try {
      await axios.delete(`https://projectihub-cloud-database.onrender.com/api/team/delete-teams/${id}`);
      message.success("Team member deleted successfully.");

      await logAction("DELETE", `Deleted team member: ${teamName}`);

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

    if (values.image?.[0]?.originFileObj) {
      formData.append("Imgurl", values.image[0].originFileObj);
    }

    if (values.pdf?.[0]?.originFileObj) {
      formData.append("pdf", values.pdf[0].originFileObj);
    }

    try {
      await axios.post(
        "https://projectihub-cloud-database.onrender.com/api/team/create-teams",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("Team added successfully!");

      await logAction("CREATE", `Added new team member: ${values.name}, Position: ${values.position}`);


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
      formData.append("Imgurl", values.file[0].originFileObj);
    }

    if (values.pdf?.[0]?.originFileObj) {
      formData.append("pdf", values.pdf[0].originFileObj);
    }

    try {
      await axios.put(
        `https://projectihub-cloud-database.onrender.com/api/team/edit-teams/${selectedTeam._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("Team updated successfully!");

      await logAction("UPDATE", `Update Team member: ${values.name}`);

      fetchTeams();
      setIsEditModalOpen(false);
      editForm.resetFields();
    } catch (error) {
      message.error("Failed to update team member.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logAction = async (action, details) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const loggedInUser = user ? user.name : "Unknown User";

    try {
      await axios.post("https://projectihub-cloud-database.onrender.com/api/logs/create-logs", {
        action,
        details,
        user: loggedInUser,
      });
    } catch (error) {
      console.error("Failed to log action", error);
    }
  };


  const columns = [
    { title: "Name", dataIndex: "name", key: "name", width:"200px" },
    { title: "Position", dataIndex: "position", key: "position", width:"200px" },
    {
      title: "Image",
      dataIndex: "Imgurl",
      key: "Imgurl", width:"200px",
      render: (Imgurl) =>
        Imgurl ? (
          <img src={Imgurl} alt="Team" style={{ width: 50 }} />
        ) : (
          "No Image"
        ),
    },
    {
      title: "PDF Status",
      dataIndex: "pdfUrl",
      key: "pdfUrl", width:"200px",
      render: (pdfUrl) => (
        <span style={{ color: pdfUrl ? "green" : "red", fontWeight:"bold" }}>{pdfUrl ? "Yes" : "No"}</span>),
    },
    {
      title: "Actions",width:"200px",
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
          <Button
            className="del-btn-team"
            type="primary"
            danger
            onClick={() => handleDelete(record._id, record.name)}
          >
            <FaTrash /> Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="Team-container">
      <h1>Teams
      </h1>
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
      <Table
    columns={columns}
    dataSource={teams}
    rowKey="_id"
    pagination={{ pageSize: 10 }}
    scroll={{ x: "max-content" }}  
  />

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
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
          >
            <Upload beforeUpload={() => false} listType="picture" accept="image/*">
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="pdf"
            label="PDF File"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
          >
            <Upload beforeUpload={() => false} accept=".pdf">
              <Button icon={<UploadOutlined />}>Upload PDF</Button>
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
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="file"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
          >
            <Upload beforeUpload={() => false} listType="picture" accept="image/*">
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="pdf"
            label="PDF File"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
          >
            <Upload beforeUpload={() => false} accept=".pdf">
              <Button icon={<UploadOutlined />}>Upload PDF</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamPanel;
