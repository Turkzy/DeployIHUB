import React from 'react'
import { Table, Button, Modal, Form, Input, message } from "antd";

const VisionPanel = () => {

  const columns = [
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
        </>
      ),
    },
  ];
  return (
    <div className='Team-container'>
      <h1>Vision</h1>
      <Table className="table-team" columns={columns} rowKey="_id" />
    </div>
  )
}

export default VisionPanel