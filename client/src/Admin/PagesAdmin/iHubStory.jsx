import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message } from "antd";
import {FaEnvelope} from "react-icons/fa";
import { FaEdit} from "react-icons/fa";

const IHubStory = () => {
  const [hubs, setHubs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editHub, setEditHub] = useState(null);
  const [form] = Form.useForm();

  // Fetch Hub
  const fetchHubs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/hub/hub"
      );
      setHubs(response.data);
    } catch (error) {
      console.error("Error fetching hubs:", error);
    }
  };

  useEffect(() => {
    fetchHubs();
  }, []);

  // Open Edit Modal
  const handleEdit = (hub) => {
    setEditHub(hub);
    form.setFieldsValue(hub);
    setIsModalVisible(true);
  };

  // Handle Form Submission
  const handleUpdate = async (values) => {
    try {
      await axios.put(
        "http://localhost:5000/api/hub/update-hub",
        values
      );
      message.success("Hub Story updated successfully!");
      setIsModalVisible(false);
      fetchHubs(); // Refresh data
    } catch (error) {
      message.error("Error updating Hub Story.");
      console.error(error);
    }
  };

  // Table Columns
  const columns = [
    { title: "Content", dataIndex: "content", key: "content", render: (text) => (
        <div style={{ whiteSpace: 'pre-line' }}>
          {text}
        </div> )},
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
           className="edit-btn-team"
            type="primary"
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}><FaEdit />Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="Team-container">
      <h1><FaEnvelope /> iHub Story</h1>
      <Table
        className="table-team"
        dataSource={hubs}
        columns={columns}
        rowKey="_id"
      />

      <Modal
        title="Edit Contact"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter Story" }]}
          >
            <Input.TextArea showCount placeholder='Enter iHub Story...' style={{ height: 300 }}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default IHubStory;
