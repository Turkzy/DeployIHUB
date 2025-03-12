import React, {useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Upload, Input, message } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import {FaHome, FaEdit, FaPlus, FaTrash} from "react-icons/fa";

const HomePanel = () => {
  const [homes, setHomes] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddHome = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    if (values.file?.[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    try {
      await axios.post(
        "https://cloud-database-test3.onrender.com/api/home/create-home-content", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("The New Home Content is added Successfully");
      fetchHomes();
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      message.error (" Failed to Add new Home Content try to Compress the Image/Video ");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    try {
      const res = await axios.get("https://cloud-database-test3.onrender.com/api/home/homes");
      setHomes(res.data);
    } catch (error) {
      message.error("Failed to Fetch the content of Homes.");
    }
  };


  const handleEditHome = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    if (values.file?.[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    try {
      await axios.put(
        `https://cloud-database-test3.onrender.com/api/home/update-home-content/${selectedHome._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("The Home Content is updated Successfully");
      fetchHomes();
      setIsEditModalOpen(false);
      editForm.resetFields();
    } catch (error) {
      message.error (" Failed to Edit Home Content ");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Home Content?")) return;
    try {
      await axios.delete(`https://cloud-database-test3.onrender.com/api/home/delete-home-content/${id}`);
      message.success("Home Content is deleted Successfully");
      fetchHomes();
    } catch (error) {
      message.error("Error deleting the home content");
    }
  }

  

  const columns = [
    { title: "Title", dataIndex: "title", key: "title", width: 300},
    { title: "Content", dataIndex: "content", key: "content", width: 800, render: (text) => (
      <div style={{ whiteSpace: 'pre-line' }}>
        {text}
      </div>
    )},
    {
      title: "Media",
      dataIndex: "url",
      key: "url",
      render: (url) => {
        if (!url) return "No Media";
    
        const isVideo = url.endsWith(".mp4");
    
        return isVideo ? (
          <video width="200" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={url} alt="Home Media" style={{ width: 200 }} />
        );
      }
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button className='edit-btn-team' onClick={() => {setSelectedHome(record);
            editForm.setFieldsValue({ ...record, file: [] });
            setIsEditModalOpen(true);
          }}><FaEdit />
            Edit
          </Button>
          <Button className='del-btn-team' type="primary" danger onClick={() => handleDelete(record._id)}>
          <FaTrash />Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className='Team-container'>
      <h1> <FaHome /> Home</h1>
      <Button type='primary' className='add-btn-team' onClick={() => {addForm.resetFields();
        setIsAddModalOpen(true);
      }}> <FaPlus /> Add New Content</Button>
      <Table
        className="table-team"
        columns={columns}
        dataSource={homes}
        rowKey="_id"
        pagination={{ pageSize: 5}}
      />
      <Modal
        title="Add New Home Content"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={() => addForm.submit()}
        confirmLoading={loading}
      >
        <Form form={addForm} onFinish={handleAddHome} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea showCount placeholder='Enter detailed content here...' style={{ height: 300 }}/>
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="file" label="Image" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList || []}>
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Image/Video</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Home Content"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={() => editForm.submit()}
        confirmLoading={loading}
      >
        <Form form={editForm} onFinish={handleEditHome} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea showCount placeholder='Enter detailed content here...' style={{ height: 300 }}/>
          </Form.Item>
          <Form.Item name="file" label="Image" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList || []}>
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Image/Video</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default HomePanel