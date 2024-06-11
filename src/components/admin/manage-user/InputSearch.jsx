import React from "react";
import { Button, Checkbox, Col, Form, Input, Row, theme } from "antd";

const InputSearch = (props) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };
  const { handleSearch, setFilter } = props;
  const onFinish = (values) => {
    let query = "";
    const { fullName, email, phone } = values;
    if (fullName) {
      query += `&fullName=/${fullName}/i`;
    }
    if (email) {
      query += `&email=/${email}/i`;
    }
    if (phone) {
      query += `&phone=/${phone}/i`;
    }
    if (query) {
      handleSearch(query);
    }
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
      style={formStyle}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="Tên hiển thị"
            name="fullName"
            labelCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Email" name="email" labelCol={{ span: 24 }}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Phone" name="phone" labelCol={{ span: 24 }}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "right", margin: "0 8px" }} span={24}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ margin: "0px 8px" }}
          >
            Submit
          </Button>
          <Button
            htmlType="submit"
            onClick={() => {
              form.resetFields();
              setFilter("");
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default InputSearch;
