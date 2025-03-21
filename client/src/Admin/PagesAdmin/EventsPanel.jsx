import React from "react";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
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
      const res = await axios.get(
        "http://localhost:5000/api/event/events"
      );
      setEvents(res.data);
    } catch (err) {
      message.error("Failed to fetch the Events");
    }
  };

  const handleDelete = async (id, eventName) => {
    if (!window.confirm("Are you sure you want to delete this Event?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/event/delete-events/${id}`
      );
      message.success("Events deleted Successfully");

      await logAction("DELETE", `Deleted Event: ${eventName}`);

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
    formData.append("content", values.content);
    formData.append("link", values.link);

    if (values.file?.[0]?.originFileObj) {
      formData.append("Imgurl", values.file[0].originFileObj);
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

      await logAction("CREATE", `Added New Event: ${values.title}`);

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
    formData.append("content", values.content);
    formData.append("link", values.link);

    if (values.file?.[0]?.originFileObj) {
      formData.append("Imgurl", values.file[0].originFileObj);
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

      await logAction("UPDATE", `Update the Event: ${values.title}`);

      fetchEvents();
      setIsEditModalOpen(false);
      editForm.resetFields();
    } catch (error) {
      message.error("Failed to update new Event.");
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
    { title: "Title", dataIndex: "title", key: "title", width: 300 },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: 700,
      render: (text, record) => {
        return (
          <div style={{ whiteSpace: "pre-line" }}>{text ? (text.length > 150 ? `${text.substring(0, 150)}...` : text) : 'No Content Available'}</div>
        );
      },
    },
    {
      title: "Image",
      dataIndex: "Imgurl",
      key: "Imgurl",
      render: (Imgurl) =>
        Imgurl ? (
          <img src={Imgurl} alt="Team" style={{ width: 50 }} />
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
            onClick={() => handleDelete(record._id, record.title)}
          >
            <FaTrash /> Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="Team-container">
      <h1> List of Events</h1>
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
        pagination={{ pageSize: 6 }}
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
          <Form.Item
  name="date"
  label="Date"
  rules={[{ required: true, message: "Please select a date" }]}
>
  <Input
    type="date"
    onChange={(e) =>
      addForm.setFieldsValue({ date: e.target.value })
    }
  />
</Form.Item>

          <Form.Item
            name="link"
            label="Event Link"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter event link (e.g., https://example.com)" />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea showCount placeholder='Enter detailed content here...' style={{ height: 300 }}/>
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
          <Form.Item
  name="date"
  label="Date"
  rules={[{ required: true, message: "Please select a date" }]}
>
  <Input
    type="date"
    onChange={(e) =>
      editForm.setFieldsValue({ date: e.target.value })
    }
  />
</Form.Item>

          <Form.Item
            name="link"
            label="Event Link"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter event link (e.g., https://example.com)" />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea showCount placeholder='Enter detailed content here...' style={{ height: 300 }}/>
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
