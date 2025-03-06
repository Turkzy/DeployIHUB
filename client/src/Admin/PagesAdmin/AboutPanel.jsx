import React from 'react'
import { Table, Button, Modal, Form, Input, message } from "antd";

const AboutPanel = () => {

  const columns = [
    { title: "Content", dataIndex: "content", key: "content" },
    { title: "Image", dataIndex: "image", key: "image" },
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
      <h1>About</h1>
      <Table
        className="table-team"
        
        columns={columns}
        rowKey="_id"
      />
    </div>
  )
}

export default AboutPanel