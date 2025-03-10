import React from "react";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaEdit, FaPlus, FaTrash, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

const EventsPanel = () => {
  const [events, setEvents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/event/events");
      setEvents(res.data);
    } catch (err) {
      message.error("Failed to fetch the Events");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Event?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/event/delete-events/${id}`);
      message.success("Events deleted Successfully");
      fetchEvents();
    } catch (err) {
      message.error("Error deleting events");
    }
  };

  const handleAddEvent = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("date", values.date);
    formData.append("link", values.link);

    if (values.file?.[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    try {
      await axios.post(
        "http://localhost:5000/api/event/create-events",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("The New Event added Successfully");
      fetchEvents();
      setIsAddModalOpen(false);
      addForm.resetFields();
    } catch (error) {
      message.error("Failed to add New Event.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditEvent = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("date", values.date);
    formData.append("link", values.link);

    if (values.file?.[0]?.originFileObj) {
      formData.append("file", values.file[0].originFileObj);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/event/update-events/${selectedEvent._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success("Event updated Successfully!");
      fetchEvents();
      setIsEditModalOpen(false);
      editForm.resetFields();
    } catch (error) {
      message.error("Failed to update new Event.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Image",
      dataIndex: "url",
      key: "url",
      render: (url, record) =>
        url ? (
          <a href={record.link} target="_blank" rel="noopener noreferrer">
            <img
              src={url}
              alt="Event"
              style={{ width: 70, cursor: "pointer" }}
            />
          </a>
        ) : (
          "No Image"
        ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            className="edit-btn-team"
            onClick={() => {
              setSelectedEvent(record);
              editForm.setFieldsValue({ ...record, file: [] });
              setIsEditModalOpen(true);
            }}
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
      <h1> <FaCalendarAlt /> List of Events</h1>
      <Button
        type="primary"
        className="add-btn-team"
        onClick={() => {
          addForm.resetFields();
          setIsAddModalOpen(true);
        }}
      >
        <FaPlus />
        Add New Events
      </Button>
      <Table
        className="table-team"
        columns={columns}
        dataSource={events}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Add New Events"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={() => addForm.submit()}
        confirmLoading={loading}
      >
        <Form form={addForm} onFinish={handleAddEvent} layout="vertical">
          <Form.Item
            name="title"
            label="Event Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="link"
            label="Event Link"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter event link (e.g., https://example.com)" />
          </Form.Item>
          <Form.Item
            name="file"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
          >
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Events"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={() => editForm.submit()}
        confirmLoading={loading}
      >
        <Form form={editForm} onFinish={handleEditEvent} layout="vertical">
          <Form.Item
            name="title"
            label="Event Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="link"
            label="Event Link"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter event link (e.g., https://example.com)" />
          </Form.Item>
          <Form.Item
            name="file"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
          >
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventsPanel;
