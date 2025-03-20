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
            const res = await axios.get("http://localhost:5000/api/logs/logs");
            setLogs(res.data);
        } catch (err) {
            message.error("Failed to fetch logs");
        }
    };

    const columns = [
        { title: "Action", dataIndex: "action", key: "action" },
        { title: "Details", dataIndex: "details", key: "details" },
        { title: "User", dataIndex: "user", key: "user" },
        { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" }
    ];

    return (
        <div>
            <h1>Logs Panel</h1>
            <Table columns={columns} dataSource={logs} rowKey="_id" />
        </div>
    );
};

export default LogsPanel;
