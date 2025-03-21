import React, {useEffect, useState} from 'react';
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";
import {FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const VisionPanel = () => {
  const [visions, setVisions] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVision, setSelectedVision] = useState(null);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddVision = async (values) => {
    setLoading(true);
    try {
      await axios.post("https://projectihub-cloud-database.onrender.com/api/vision/create-vision-content", values);
      message.success("The Content is added successfully");

      await logAction("CREATE", `CREATE  Mission/Vision/Values: ${values.title}`);

      fetchVisions();
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      message.error("Failed to add new Content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisions();
  }, []);

  const fetchVisions = async () => {
    try {
      const res = await axios.get("https://projectihub-cloud-database.onrender.com/api/vision/visions");
      setVisions(res.data);
    } catch (error) {
      message.error("Failed to fetch the content of Vision/Mission");
    }
  };

  const handleEditVision = async (values) => {
    setLoading(true);
    try {
      await axios.put(
        `https://projectihub-cloud-database.onrender.com/api/vision/update-vision-content/${selectedVision._id}`, 
        values
      );
      message.success("The Content is updated successfully");

      await logAction("UPDATE", `Update Mision/Vision/Values: ${values.title}`);

      fetchVisions();
      setIsEditModalOpen(false);
      editForm.resetFields();
    } catch (error) {
      message.error("Failed to update Content");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm("Are you sure you want to delete this content?")) return;
    try {
      await axios.delete(`https://projectihub-cloud-database.onrender.com/api/vision/delete-vision-content/${id}`);
      message.success("Content deleted successfully");

      await logAction("DELETE", `Update Team member: ${title}`);

      fetchVisions();
    } catch (error) {
      message.error("Error deleting the content");
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
    { title: "Title", dataIndex: "title", key: "title", width: 120 },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: 1000,
      render: (text, record) => {
        return (
          <div style={{ whiteSpace: "pre-line" }}>{text ? (text.length > 150 ? `${text.substring(0, 150)}...` : text) : 'No Content Available'}</div>
        );
      },
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button 
            className='edit-btn-team'
            onClick={() => {
              setSelectedVision(record);
              editForm.setFieldsValue({ ...record });
              setIsEditModalOpen(true);
            }}
          >
            <FaEdit /> Edit
          </Button>
          <Button 
            className='del-btn-team' 
            type="primary" 
            danger 
            onClick={() => handleDelete(record._id, record.title)}
          >
            <FaTrash /> Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className='Team-container'>
      <h1>Vision</h1>
      <Button 
        type='primary' 
        className='add-btn-team' 
        onClick={() => {
          addForm.resetFields();
          setIsAddModalOpen(true);
        }}
      >
        <FaPlus /> Add New Content
      </Button>
      <p className='vision-note'>Note: Only [MISSION, VISION, VALUES] are allowed for the Title. Delete if not needed.</p>
      <Table 
        className="table-team" 
        dataSource={visions} 
        columns={columns} 
        rowKey="_id" 
        pagination={{ pageSize: 5 }} 
      />

      <Modal
        title="Add New Content"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={() => addForm.submit()}
        confirmLoading={loading}
      >
        <Form form={addForm} onFinish={handleAddVision} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea 
              showCount 
              placeholder='Enter detailed content here...' 
              style={{ height: 300 }} 
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Content"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={() => editForm.submit()}
        confirmLoading={loading}
      >
        <Form form={editForm} onFinish={handleEditVision} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea 
              showCount 
              placeholder='Enter detailed content here...' 
              style={{ height: 300 }} 
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VisionPanel;
