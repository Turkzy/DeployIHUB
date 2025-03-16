import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/ihublogo.gif";
import HomePanel from "../PagesAdmin/HomePanel";
import VisionPanel from "../PagesAdmin/VisionPanel";
import AboutPanel from "../PagesAdmin/AboutPanel";
import EventsPanel from "../PagesAdmin/EventsPanel";
import ContactPanel from "../PagesAdmin/ContactPanel";
import AccountPanel from "../PagesAdmin/Account";
import TeamPanel from "../PagesAdmin/TeamPanel";
import HubStory from "../PagesAdmin/iHubStory.jsx"

import Sidebar from "../ComponentsAdmin/Sidebar";


const { Header, Sider, Content, Footer } = Layout;

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
      }, 600000); // 5 minutes
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

    // Existing inactivity timer
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
    <Layout style={{ minHeight: "100vh" }}>
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
        <div className="logo" style={{ textAlign: "center", padding: "20px" }}>
          {collapsed ? (
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "40px", height: "30px" }}
            />
          ) : (
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>

        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          {isLoggedIn && (
            <Menu.Item
              key="4"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          )}
        </Menu>
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header
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
          <h2 style={{ marginLeft: "16px" }}>Dashboard</h2>
        </Header>

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
      </Layout>
    </Layout>
  );
};

export default Dashboard;
