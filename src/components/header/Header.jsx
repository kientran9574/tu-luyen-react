import React from "react";
import "./Headers.scss";
import { FaReact } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { Badge, Dropdown, Space, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../../service/api";
import { doLogoutLogin } from "../../redux/account/accountSlice";
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
  const items = [
    {
      key: "account",
      label: <label>Quản lý tài khoản</label>,
    },
    {
      key: "logout",
      label: (
        <button className="cursor-pointer" onClick={() => handleLogout()}>
          Đăng xuất
        </button>
      ),
    },  
  ];
  return (
    <div className="header-container">
      <header className="page-container">
        <div className="page-container__top">
          <div className="page-container__logo">
            <FaReact className="logo rotate"></FaReact>
            <CiSearch className="search" />
          </div>
          <input type="text" className="input-search" placeholder="Tìm kiếm" />
        </div>
        <div className="page-container__bottom">
          <Badge count={5} size="small">
            <CiShoppingCart className="cart" />
          </Badge>

          <Dropdown
            className="cursor-pointer"
            menu={{
              items,
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
      </header>
    </div>
  );
};

export default Headers;
