import { Form, Button, Modal, Input, message } from "antd";
import React, { useEffect } from "react";
import { putUpdateUser } from "../../../service/api";

const UserModelUpdate = (props) => {
  const [form] = Form.useForm();
  const {
    openModelUpdate,
    setOpenModelUpdate,
    dataUpdate,
    setDataUpdate,
    fetchListDataUser,
  } = props;

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  const handleCancel = () => {
    setOpenModelUpdate(false);
    setDataUpdate(null);
  };
  const onFinish = async (values) => {
    const { _id, fullName, phone } = values;
    const res = await putUpdateUser(_id, fullName, phone);
    if (res && res.data) {
      message.success("Update user thanh cong");
      setOpenModelUpdate(false);
      await fetchListDataUser();
    }
    else{
        message.error("Update User that bai")
    }
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={openModelUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            labelCol={{
              span: 24,
            }}
            label="Id"
            name="_id"
            hidden
            rules={[
              {
                required: true,
                message: "Please input your Ten hiển thị!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ten hiển thị"
            labelCol={{
              span: 24,
            }}
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your Ten hiển thị!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{
              span: 24,
            }}
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            labelCol={{
              span: 24,
            }}
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
        </Form>
      </Modal>
    </>
  );
};

export default UserModelUpdate;
