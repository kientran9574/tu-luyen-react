import React, { useState } from "react";
import { Badge, Button, Descriptions, Drawer } from "antd";
import moment from "moment";
const UserViewDetail = (props) => {
  const {
    setOpenViewDetails,
    openViewDetails,
    setDataViewDetails,
    dataViewDetails,
  } = props;
  const onClose = () => {
    setOpenViewDetails(false);
    setDataViewDetails(null);
  };
  return (
    <>
      <Drawer
        title="Basic Drawer"
        onClose={onClose}
        open={openViewDetails}
        width={"50vw"}
      >
        <Descriptions title="User Info" bordered column={2} width={"50vw"}>
          <Descriptions.Item label="Tên hiển thị">
            {dataViewDetails?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="email">
            {" "}
            {dataViewDetails?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {dataViewDetails?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            <Badge status="processing" text={dataViewDetails?.role} />
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo user">
            {moment(dataViewDetails?.createdAt).format("DD-MM-YY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sửa user">
            {moment(dataViewDetails?.updatedAt).format("DD-MM-YY HH:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
export default UserViewDetail;
