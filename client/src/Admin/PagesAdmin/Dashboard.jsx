import React, { useEffect, useState } from "react";
import { Layout as AntdLayout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import HomePanel from "../PagesAdmin/HomePanel";
import VisionPanel from "../PagesAdmin/VisionPanel";
import AboutPanel from "../PagesAdmin/AboutPanel";
import EventsPanel from "../PagesAdmin/EventsPanel";
import ContactPanel from "../PagesAdmin/ContactPanel";
import AccountPanel from "../PagesAdmin/Account";
import TeamPanel from "../PagesAdmin/TeamPanel";
import HubStory from "../PagesAdmin/iHubStory.jsx";

import Header from "../ComponentsAdmin/Header.jsx";
import Sidebar from "../ComponentsAdmin/Sidebar";

const { Header: AntdHeader, Sider, Content, Footer } = AntdLayout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("1");

  // Check for token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Auto logout feature after inactivity
  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/Logout");
      }, 600000); // 10 minutes
    };

    const events = ["mousemove", "keydown", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(logoutTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    // Check token expiration every minute
    const tokenCheckInterval = setInterval(checkTokenExpiration, 60000);
    checkTokenExpiration(); // Initial check

    let logoutTimer;
    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/Logout");
      }, 300000); // 5 minutes
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearInterval(tokenCheckInterval);
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [navigate]);

  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        className="sider-style"
        style={{ backgroundColor: "white", boxShadow: "0px 0px 10px black" }}
        collapsible
        collapsed={collapsed}
        trigger={null}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Sidebar onSelect={setSelectedMenu} />
      </Sider>

      {/* Main Layout */}
      <AntdLayout>
        {/* Header */}
        <AntdHeader
          style={{
            boxShadow: "0px 0px 1px black",
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => setCollapsed(false)}
            />
          ) : (
            <MenuFoldOutlined
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => setCollapsed(true)}
            />
          )}
          <Header /> {/* Custom Header Component */}
        </AntdHeader>

        {/* Content */}
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: "#fff",
            minHeight: "80vh",
          }}
        >
          {selectedMenu === "1" ? <HomePanel /> : <h2></h2>}
          {selectedMenu === "2" ? <VisionPanel /> : <h2></h2>}
          {selectedMenu === "3" ? <AboutPanel /> : <h2></h2>}
          {selectedMenu === "4" ? <HubStory /> : <h2></h2>}
          {selectedMenu === "5" ? <EventsPanel /> : <h2></h2>}
          {selectedMenu === "6" ? <TeamPanel /> : <h2></h2>}
          {selectedMenu === "7" ? <ContactPanel /> : <h2></h2>}
          {selectedMenu === "8" ? <AccountPanel /> : <h2></h2>}
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: "center",
            background: "#f0f2f5",
            padding: "10px",
          }}
        >
          MyApp ©2025 Created by You
        </Footer>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Dashboard;
