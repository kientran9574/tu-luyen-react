import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { postLogin } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLoginDataUser } from "../../redux/account/accountSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values) => {
    const { username, password } = values;
    const res = await postLogin(username, password);
    setIsLoading(true);
    if (res && res.data) {
      localStorage.setItem("access_token", res.data.data.access_token);
      dispatch(doLoginDataUser(res.data.data.user));
      message.success("dang nhap thanh cong");
      navigate("/");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      message.error("dang nhap that bai");
    }
  };
  return (
    <div className="mt-5">
      <h1 className="text-center font-bold text-5xl">Đăng nhập</h1>
      <Form
        className="mt-10 mx-auto"
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
