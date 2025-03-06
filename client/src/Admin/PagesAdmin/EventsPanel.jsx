import React from 'react'
import { Table, Button, Modal, Form, Input, message } from "antd";

const EventsPanel = () => {

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Image", dataIndex: "image", key: "image" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className='Team-container'>
      <h1>Events</h1>
      <Table  className="table-team" columns={columns} rowKey="_id" />
      </div>
  )
}

export default EventsPanel