import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { FaEdit} from "react-icons/fa";

const IHubStory = () => {
  const [hubs, setHubs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editHub, setEditHub] = useState(null);
  const [form] = Form.useForm();
  const [expandedRows, setExpandedRows] = useState({});

const toggleExpanded = (key) => {
  setExpandedRows((prev) => ({
    ...prev,
    [key]: !prev[key]
  }));
};

  // Fetch Hub
  const fetchHubs = async () => {
    try {
      const response = await axios.get(
        "https://cloud-database-test3.onrender.com/api/hub/hub"
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
        "https://cloud-database-test3.onrender.com/api/hub/update-hub",
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
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: 1800,
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
      <h1>iHub Story</h1>
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
