import React, {useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Upload, Input, message } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import {FaInfoCircle, FaEdit, FaPlus, FaTrash} from "react-icons/fa";

const AboutPanel = () => {
  const [abouts, setAbouts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAbout, setSelectedAbout] = useState(null);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddAbout = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    if (values.file?.[0]?.originFileObj) {
      formData.append("Imgurl", values.file[0].originFileObj);
    }

    try {
      await axios.post(
        "http://localhost:5000/api/about/create-about-content", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("The New About Content is added Successfully");
      fetchAbouts();
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      message.error (" Failed to Add new About Content try to Compress the Image/Video ");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAbouts();
  }, []);

  const fetchAbouts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/about/abouts");
      setAbouts(res.data);
    } catch (error) {
      message.error("Failed to Fetch the content of Abouts.");
    }
  };


  const handleEditAbout = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    if (values.file?.[0]?.originFileObj) {
      formData.append("Imgurl", values.file[0].originFileObj);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/about/update-about-content/${selectedAbout._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("The About Content is updated Successfully");
      fetchAbouts();
      setIsEditModalOpen(false);
      editForm.resetFields();
    } catch (error) {
      message.error (" Failed to Edit About Content ");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this About Content?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/about/delete-about-content/${id}`);
      message.success("About Content is deleted Successfully");
      fetchAbouts();
    } catch (error) {
      message.error("Error deleting the about content");
    }
  }

  

  const columns = [
    { title: "Title", dataIndex: "title", key: "title", width: 120},
    { title: "Content", dataIndex: "content", key: "content", width: 800, render: (text) => (
      <div style={{ whiteSpace: 'pre-line' }}>
        {text}
      </div>
    )},
    {
      title: "Media",
      dataIndex: "Imgurl",
      key: "Imgurl",
      render: (Imgurl) => {
        if (!Imgurl) return "No Media";
      
        const isVideo = Imgurl.endsWith(".mp4");
      
        return isVideo ? (
          <video width="200" controls>
            <source src={Imgurl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={Imgurl} alt="About Media" style={{ width: 200 }} />
        );
      }  
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button className='edit-btn-team' onClick={() => {setSelectedAbout(record);
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
      <h1> <FaInfoCircle /> About</h1>
      <Button type='primary' className='add-btn-team' onClick={() => {addForm.resetFields();
        setIsAddModalOpen(true);
      }}> <FaPlus /> Add New Content</Button>
      <Table
        className="table-team"
        columns={columns}
        dataSource={abouts}
        rowKey="_id"
        pagination={{ pageSize: 5}}
      />
      <Modal
        title="Add New About Content"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={() => addForm.submit()}
        confirmLoading={loading}
      >
        <Form form={addForm} onFinish={handleAddAbout} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea showCount placeholder='Enter detailed content here...' style={{ height: 300 }}/>
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="file" label="Image" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList || []}>
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Image/Videos</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit About Content"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={() => editForm.submit()}
        confirmLoading={loading}
      >
        <Form form={editForm} onFinish={handleEditAbout} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea showCount placeholder='Enter detailed content here...' style={{ height: 300 }}/>
          </Form.Item>
          <Form.Item name="file" label="Image" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList || []}>
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AboutPanel