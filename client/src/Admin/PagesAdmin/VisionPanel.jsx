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
  const [expandedRows, setExpandedRows] = useState({});

const toggleExpanded = (key) => {
  setExpandedRows((prev) => ({
    ...prev,
    [key]: !prev[key] // Toggle the specific row's state
  }));
};

  const handleAddVision = async (values) => {
    setLoading(true);
    try {
      await axios.post("https://cloud-database-test3.onrender.com/api/vision/create-vision-content", values);
      message.success("The Content is added successfully");
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
      const res = await axios.get("https://cloud-database-test3.onrender.com/api/vision/visions");
      setVisions(res.data);
    } catch (error) {
      message.error("Failed to fetch the content of Vision/Mission");
    }
  };

  const handleEditVision = async (values) => {
    setLoading(true);
    try {
      await axios.put(
        `https://cloud-database-test3.onrender.com/api/vision/update-vision-content/${selectedVision._id}`, 
        values
      );
      message.success("The Content is updated successfully");
      fetchVisions();
      setIsEditModalOpen(false);
      editForm.resetFields();
    } catch (error) {
      message.error("Failed to update Content");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this content?")) return;
    try {
      await axios.delete(`https://cloud-database-test3.onrender.com/api/vision/delete-vision-content/${id}`);
      message.success("Content deleted successfully");
      fetchVisions();
    } catch (error) {
      message.error("Error deleting the content");
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
        const isExpanded = expandedRows[record._id] || false;
  
        return (
          <div style={{ whiteSpace: 'pre-line' }}>
            {isExpanded ? text : `${text.substring(0, 150)}...`}
            {text.length > 100 && (
              <Button className='see-lessmore'
                type="link"
                onClick={() => toggleExpanded(record._id)}
                style={{ padding: 0, marginLeft: 5 }}
              >
                {isExpanded ? "See Less" : "See More"}
              </Button>
            )}
          </div>
        );
      }
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
            onClick={() => handleDelete(record._id)}
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
