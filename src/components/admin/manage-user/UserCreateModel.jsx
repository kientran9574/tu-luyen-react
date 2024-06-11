import React, { useState } from "react";
import { Button, Form, Modal, Input, message, notification } from "antd";
import { postCreateUser } from "../../../service/api";
const UserCreateModel = (props) => {
  const { openCreateModel, setOpenCreateModel, fetchListDataUser } = props;
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpenCreateModel(false);
  };
  const onFinish = async (values) => {
    const { fullName, password, email, phone } = values;
    const res = await postCreateUser(fullName, email, phone, password);
    if (res && res.data) {
      message.success("Tạo mới thành công");
      form.resetFields();
      setOpenCreateModel(false);
      await fetchListDataUser();
    } else {
      notification.error({
        message: "Đã xảy ra lỗi",
        description: res.message,
      });
      setOpenCreateModel(false);
    }
  };
  return (
    <>
      <Modal
        title="Thêm người dùng"
        open={openCreateModel}
        onOk={() => {
          form.submit();
        }}
        okText={"Tạo mới"}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            labelCol={{ span: 24 }}
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
            label="Password"
            labelCol={{ span: 24 }}
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
            label="Email"
            labelCol={{ span: 24 }}
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
            label="Phone"
            labelCol={{ span: 24 }}
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
        </Form>
      </Modal>
    </>
  );
};
export default UserCreateModel;
