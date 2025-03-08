import React, { useState } from "react";
import { Button, Layout } from "antd";
import Sidebar from "../ComponentsAdmin/Sidebar";
import CustomHeader from "../ComponentsAdmin/Header";
import HomePanel from "../PagesAdmin/HomePanel";
import VisionPanel from "../PagesAdmin/VisionPanel";
import AboutPanel from "../PagesAdmin/AboutPanel";
import EventsPanel from "../PagesAdmin/EventsPanel";
import ContactPanel from "../PagesAdmin/ContactPanel";
import AccountPanel from "../PagesAdmin/Account";

import TeamPanel from "../PagesAdmin/TeamPanel";
import "../DesignAdmin/Dashboard.css";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Sider, Header, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("1");

  return (
    <Layout>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={`sider ${collapsed ? "collapsed" : ""}`}
      >
        <Sidebar onSelect={setSelectedMenu} />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 0 : 0,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header className="header">
          
          <CustomHeader />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger-btn" 
          />
        </Header>
        <Content className="content">
          {selectedMenu === "1" ? <HomePanel /> : <h2></h2>}
          {selectedMenu === "2" ? <VisionPanel /> : <h2></h2>}
          {selectedMenu === "3" ? <AboutPanel /> : <h2></h2>}
          {selectedMenu === "4" ? <EventsPanel /> : <h2></h2>}
          {selectedMenu === "5" ? <TeamPanel /> : <h2></h2>}
          {selectedMenu === "6" ? <ContactPanel /> : <h2></h2>}
          {selectedMenu === "7" ? <AccountPanel /> : <h2></h2>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
