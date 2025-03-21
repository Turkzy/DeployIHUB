import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Select } from "antd";
import { FaEdit, FaPlus, FaTrash, FaUserCircle } from "react-icons/fa";
import axios from "axios";





const Account = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://projectihub-cloud-database.onrender.com/api/auth/all-users");
      setUsers(res.data.users || []);
    } catch (error) {
      message.error("Error fetching users.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://projectihub-cloud-database.onrender.com/api/auth/delete-user/${id}`);
      message.success("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      message.error("Error deleting user.");
    }
  };

  const handleAddUser = async (values) => {
    setLoading(true);
    try {
      await axios.post("https://projectihub-cloud-database.onrender.com/api/auth/add-user", values);
      message.success("User added successfully!");
      fetchUsers();
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      message.error("Failed to add user.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (values) => {
    if (!values.password) {
      message.error("Please enter a new password.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `https://projectihub-cloud-database.onrender.com/api/auth/edit-user/${selectedUser._id}`,
        values
      );
      message.success("User updated successfully!");
      fetchUsers();
      setIsEditModalOpen(false);
      editForm.resetFields();
    } catch (error) {
      message.error("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  const showEditModal = (user) => {
    setSelectedUser(user);
    editForm.setFieldsValue({ ...user, password: "" });
    setIsEditModalOpen(true);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", width: "100px" },
    { title: "Email", dataIndex: "email", key: "email", width: "200px" },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      width: "200px",
    },
    {
      title: "Usertype",
      dataIndex: "usertype",
      key: "usertype",
      width: "200px",
    },
    {
      title: "Actions",
      width: "200px",
      render: (_, record) => (
        <>
          <Button
            className="edit-btn-team"
            onClick={() => showEditModal(record)}
          >
            <FaEdit /> Edit
          </Button>
          <Button
            className="del-btn-team"
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
    <div className="Team-container">
      <h1>Account Management</h1>
      <Button
        type="primary"
        className="add-btn-team"
        onClick={() => {
          addForm.resetFields();
          setIsAddModalOpen(true);
        }}
      >
        <FaPlus /> Add New User
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />

      {/* Add Modal */}
      <Modal
        title="Add New User"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={() => addForm.submit()}
        confirmLoading={loading}
      >
        <Form form={addForm} onFinish={handleAddUser} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="usertype"
            label="Usertype"
            rules={[{ required: true, message: "Please select a user type!" }]}
          >
            <Select placeholder="Select user type">
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={() => editForm.submit()}
        confirmLoading={loading}
      >
        <Form form={editForm} onFinish={handleEditUser} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="usertype"
            label="Usertype"
            rules={[{ required: true, message: "Please select a user type!" }]}
          >
            <Select placeholder="Select user type">
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
            </Select>
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
