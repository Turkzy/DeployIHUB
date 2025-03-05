import React from 'react'
import { Table, Button, Modal, Form, Input, message } from "antd";
import "../DesignAdmin/TeamPanel.css"


const TeamPanel = () => {

  const columns = [
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Address", dataIndex: "address", key: "address" },
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
      <h1>Teams</h1>
      <Table  className="table-team" columns={columns} rowKey="_id" />
      </div>
    
  )
}

export default TeamPanel