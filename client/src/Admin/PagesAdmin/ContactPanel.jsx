import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { FaEdit} from "react-icons/fa";

const ContactPanel = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [form] = Form.useForm();

  // Fetch Contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "https://projectihub-cloud-database.onrender.com/api/contact/all-contacts"
      );
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Open Edit Modal
  const handleEdit = (contact) => {
    setEditContact(contact);
    form.setFieldsValue(contact);
    setIsModalVisible(true);
  };

  // Handle Form Submission
  const handleUpdate = async (values) => {
    try {
      await axios.put(
        "https://projectihub-cloud-database.onrender.com/api/contact/update-contact",
        values
      );
      message.success("Contact updated successfully!");

      const user = JSON.parse(localStorage.getItem("user"));
      const loggedInUser = user ? user.name : "Unknown User";
  
      // Log the update action
      await axios.post("https://projectihub-cloud-database.onrender.com/api/logs/create-logs", {
        action: "UPDATE",
        details: `Updated contact with email: ${values.email}, phone: ${values.phone}, address: ${values.address}`,
        user: loggedInUser, // Replace with actual user info if available
      });
  
      setIsModalVisible(false);
      fetchContacts(); // Refresh data
    } catch (error) {
      message.error("Error updating contact.");
      console.error(error);
    }
  };
  

  // Table Columns
  const columns = [
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Address", dataIndex: "address", key: "address" },
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
      <h1>Contact List</h1>
      <Table
        className="table-team"
        dataSource={contacts}
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
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactPanel;
