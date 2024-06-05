import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const Error403 = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default Error403;
