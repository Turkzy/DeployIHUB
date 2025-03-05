import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";

const Account = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/all-users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await fetch(`http://localhost:5000/api/auth/delete-user/${id}`, {
          method: "DELETE",
        });
        message.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const showEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue({ ...user, password: "" });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Remove password from request if not changed
      if (!values.password) {
        delete values.password;
      }

      const method = editingUser ? "PUT" : "POST";
      const url = editingUser
        ? `http://localhost:5000/api/auth/edit-user/${editingUser._id}`
        : "http://localhost:5000/api/auth/add-user";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      message.success(
        editingUser ? "User updated successfully" : "User added successfully"
      );
      fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Password", dataIndex: "password", key: "password" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>User Accounts</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add User
      </Button>
      <Table dataSource={users} columns={columns} rowKey="_id" />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Enter Name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Enter Email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="New Password"
            rules={[{ required: true, message: "Please enter a new password" }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Account;
