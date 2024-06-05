import React, { useState } from "react";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space, message, theme } from "antd";
import { postLogout } from "../../../service/api";
import { doLogoutLogin } from "../../../redux/account/accountSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const Headers = () => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("checkkkkk");
    const res = await postLogout();
    if (res && res.data) {
      dispatch(doLogoutLogin());
      message.success("Đăng xuất thành công ");
      navigate("/");
    }
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const itemsDropdown = [
    {
      key: "account",
      label: <label>Quản lý tài khoản</label>,
    },
    {
      key: "logout",
      label: (
        <button className="px-2  cursor-pointer" onClick={() => handleLogout()}>
          Đăng xuất
        </button>
      ),
    },
  ];
  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Quan ly user",
              children: [
                {
                  key: "crud",
                  label: <label>CRUD</label>,
                },
                {
                  key: "filter",
                  label: <label>FILTER</label>,
                },
              ],
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <div className="flex items-center justify-between">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Dropdown
            className="cursor-pointer"
            menu={{
              items: itemsDropdown,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")}>Tài khoản</span>
                ) : (
                  <p>Welcom {user?.fullName}</p>
                )}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default Headers;
