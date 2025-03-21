import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import axios from "axios";

const LogsPanel = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const res = await axios.get("https://projectihub-cloud-database.onrender.com/api/logs/logs");
            setLogs(res.data);
        } catch (err) {
            message.error("Failed to fetch logs");
        }
    };

    const columns = [
        { 
            title: "Action", 
            dataIndex: "action", 
            key: "action",
            render: (action) => {
                let color = "black"; // Default color
    
                if (action === "CREATE") color = "blue";
                else if (action === "UPDATE") color = "green";
                else if (action === "DELETE") color = "red";
    
                return <span style={{ color, fontWeight: "bold" }}>{action}</span>;
            }
        },
        { title: "Details", dataIndex: "details", key: "details" },
        { title: "User", dataIndex: "user", key: "user" },
        { 
            title: "Time", 
            dataIndex: "timestamp", 
            key: "timestamp",
            render: (timestamp) => new Date(timestamp).toLocaleString() // Format date & time
        }
    ];

    return (
        <div className="Team-container">
            <h1>Logs Panel</h1>
            <Table columns={columns} dataSource={logs} rowKey="_id" scroll={{ x: "max-content" }}  />
        </div>
    );
};

export default LogsPanel;
