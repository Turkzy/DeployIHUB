import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  BookOutlined,
  CalendarOutlined,
  TeamOutlined,
  MailOutlined,
  UserOutlined,
  LogoutOutlined,
  FileTextOutlined 
} from "@ant-design/icons";

import "../DesignAdmin/Sidebar.css";
import LogoDashboard from "../../img/ihublogo.gif";

const Sidebar = ({ onSelect, collapsed }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if(token) {
      setIsLoggedIn(true);
      setUserType(storedUser?.usertype || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    setIsLoggedIn(false);
    navigate("/Logout");
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="logo">
        {!collapsed && <img src={LogoDashboard} alt="logo-dashboard" />}
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="menu-bar"
        onClick={(e) => {
          if (e.key === "10") handleLogout();
          else onSelect(e.key);
        }}
        items={[
          { key: "1", icon: <HomeOutlined />, label: "Home" },
          { key: "2", icon: <EyeOutlined />, label: "Vision" },
          { key: "3", icon: <InfoCircleOutlined />, label: "About" },
          { key: "4", icon: <BookOutlined />, label: "IHub Story" },
          { key: "5", icon: <CalendarOutlined />, label: "Events" },
          { key: "6", icon: <TeamOutlined />, label: "Team" },
          { key: "7", icon: <MailOutlined />, label: "Contact" },
          { key: "8", icon: <FileTextOutlined />, label: "Logs" },

          userType === "Admin" && {
            key: "9", icon: <UserOutlined/>, label: "Account"
          },
          isLoggedIn && {
            key: "10",
            icon: <LogoutOutlined style={{ color: "red" }} />,
            label: "Logout",
            danger: true,
          },
        ].filter(Boolean)}
      />
    </div>
  );
};

export default Sidebar;
