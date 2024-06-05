import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { postRegister } from "../../service/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;
    const res = await postRegister(fullName, email, password, phone);
    setIsLoading(true);
    if (res && res.data) {
      message.success("Dang ky thanh cong");
      setIsLoading(false);
      navigate("/login");
    } else {
      setIsLoading(false);
      message.error("Dang ky that bai !");
    }
  };
  return (
    <>
      <div className="pt-5">
        <h1 className="text-center font-bold text-5xl">Đăng ký </h1>
        <Form
          className="mx-auto text-center mt-10"
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
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name : "
            name="fullName"
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
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
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
