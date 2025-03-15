import React, {useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Upload, Input, message } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import {FaHome, FaEdit} from "react-icons/fa";

const HomePanel = () => {
  const [homes, setHomes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  


  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/home/homes");
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
      formData.append("Imgurl", values.file[0].originFileObj);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/home/update-home-content/${selectedHome._id}`, formData, {
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

  const columns = [
    { title: "Title", dataIndex: "title", key: "title", width: 300},
    { title: "Content", dataIndex: "content", key: "content", width: 600, render: (text) => (
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
          <img src={Imgurl} alt="Home Media" style={{ width: 100 }} />
        );
      }
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
  className="edit-btn-team"
  onClick={() => {
    setSelectedHome(record);
    editForm.setFieldsValue({ 
      title: record.title, 
      content: record.content, 
      file: [] // Reset file input
    });
    setIsEditModalOpen(true);
  }}
>
  <FaEdit /> Edit
</Button>

        </>
      ),
    },
  ];

  return (
    <div className='Team-container'>
      <h1> <FaHome /> Home</h1>
      
      <Table
        className="table-team"
        columns={columns}
        dataSource={homes}
        rowKey="_id"
        pagination={{ pageSize: 5}}
      />
      
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