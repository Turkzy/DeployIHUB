import React, { useState } from "react";
import { Button, Layout } from 'antd';
import Sidebar from "../ComponentsAdmin/Sidebar";
import CustomHeader from "../ComponentsAdmin/Header";
import AccountPanel from "../PagesAdmin/Account"
import TeamPanel from "../PagesAdmin/TeamPanel"
import "../DesignAdmin/Dashboard.css";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

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
        className={`sider ${collapsed ? 'collapsed' : ''}`}
      >
        <Sidebar onSelect={setSelectedMenu} />
        <Button 
          type="text" 
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="trigger-btn"
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 0 : 0, transition: "margin-left 0.3s ease" }}>
        <Header className="header">
          <CustomHeader/>
        </Header>
        <Content className="content">
          {selectedMenu === "5" ? <TeamPanel /> : <h2></h2>}
          {selectedMenu === "7" ? <AccountPanel /> : <h2></h2>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
