import React, { useState } from "react";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  message,
  theme,
} from "antd";
import { postLogout } from "../../../service/api";
import { doLogoutLogin } from "../../../redux/account/accountSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const Headers = () => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const url = `http://localhost:8082/images/avatar/${user?.avatar}`;

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
      key: "home",
      label: <Link to={"/"}>Trang chủ</Link>,
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
              label: <Link to="/admin">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Quan ly user",
              children: [
                {
                  key: "crud",
                  label: <Link to="/admin/user">CRUD</Link>,
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
                  <>
                    <Avatar size="large" src={url} />
                    {user?.fullName}
                  </>
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
          {/* sau này viết logic cho thằng này user là không đc thầy tài nguyên của admin */}
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Headers;
