import React from 'react'
import { Table, Button, Modal, Form, Input, message } from "antd";
import "../DesignAdmin/TeamPanel.css"


const TeamPanel = () => {

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Position", dataIndex: "position", key: "position" },
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