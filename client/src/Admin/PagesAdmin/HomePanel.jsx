import React, {useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Upload, Input, message } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import {FaEdit} from "react-icons/fa";

const HomePanel = () => {
  const [homes, setHomes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});

const toggleExpanded = (key) => {
  setExpandedRows((prev) => ({
    ...prev,
    [key]: !prev[key]
  }));
};
  


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

      await logAction("UPDATE", `Update Title/Content: ${values.title}`);

      fetchHomes();
      setIsEditModalOpen(false);
      editForm.resetFields();
    } catch (error) {
      message.error (" Failed to Edit Home Content ");
    } finally {
      setLoading(false);
    }
  };


  const logAction = async (action, details) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const loggedInUser = user ? user.name : "Unknown User";

    try {
      await axios.post("http://localhost:5000/api/logs/create-logs", {
        action,
        details,
        user: loggedInUser,
      });
    } catch (error) {
      console.error("Failed to log action", error);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title", width: 200},
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
      title: "Media",
      dataIndex: "Imgurl",
      key: "Imgurl",
      render: (Imgurl) => {
        if (!Imgurl) return "No Media";
    
        const isVideo = Imgurl.endsWith(".mp4");
    
        return isVideo ? (
          <video width="150" controls>
            <source src={Imgurl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={Imgurl} alt="Home Media" style={{ width: 100 }} />
        );
      }
    },
    {
      title: "Actions", width: 0,
      render: (_, record) => (
        <>
          <Button
  className="edit-btn-team"
  onClick={() => {
    setSelectedHome(record);
    editForm.setFieldsValue({ 
      title: record.title, 
      content: record.content, 
      file: [] 
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
      <h1> Home</h1>
      
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