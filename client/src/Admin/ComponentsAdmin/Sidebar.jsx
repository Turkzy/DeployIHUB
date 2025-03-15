import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  FaHome,
  FaEye,
  FaInfoCircle,
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaSignOutAlt,
  FaUserCircle,
  FaBook
} from "react-icons/fa";
import "../DesignAdmin/Sidebar.css";
import LogoDashboard from "../../img/logo.png";

const Sidebar = ({ onSelect, collapsed }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
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
          if (e.key === "8") handleLogout();
          else onSelect(e.key);
        }}
        items={[
          { key: "1", icon: <FaHome />, label: "Home" },
          { key: "2", icon: <FaEye />, label: "Vision" },
          { key: "3", icon: <FaInfoCircle />, label: "About" },
          { key: "4", icon: <FaBook />, label: "IHub Story" },
          { key: "5", icon: <FaCalendarAlt />, label: "Events" },
          { key: "6", icon: <FaUsers />, label: "Team" },
          { key: "7", icon: <FaEnvelope />, label: "Contact" },
          { key: "8", icon: <FaUserCircle />, label: "Account" },
          isLoggedIn && {
            key: "9",
            icon: <FaSignOutAlt style={{ color: "red" }} />,
            label: "Logout",
            danger: true,
          },
        ].filter(Boolean)}
      />
    </div>
  );
};

export default Sidebar;
