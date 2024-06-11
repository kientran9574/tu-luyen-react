import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import * as xlsx from "xlsx";
import { message, Modal, notification, Table, Upload } from "antd";
import { fetchDataExcel } from "../../../service/api";
import template from "./data/template.xlsx?url";
const { Dragger } = Upload;

const UserUploadModel = (props) => {
  const { openUploadModel, setOpenUploadModel } = props;
  const [dataExcel, setDataExcel] = useState([]);
  const dummyRequest = ({ title, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };
  const propsUpload = {
    name: "file",
    multiple: true,
    accept:
      ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = function () {
            const data = new Uint8Array(reader.result);
            const workbook = xlsx.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = xlsx.utils.sheet_to_json(sheet, {
              header: ["fullName", "email", "phone"],
              range: 1,
            });
            if (jsonData && jsonData.length > 0) setDataExcel(jsonData);
          };
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const handleOk = async () => {
    const data = dataExcel.map((item) => {
      item.password = "123456";
      return item;
    });
    const res = await fetchDataExcel(data);
    if (res && res.data) {
      notification.success({
        message: "Data upload thanh cong",
        description: `Success: ${res.data.data.countSuccess} , Error: ${res.data.data.countError}`,
      });
      setDataExcel([]);
      setOpenUploadModel(false);
    } else {
      notification.error({
        message: "Upload data that bai",
        description: `Error: ${res.data.countError}`,
      });
    }
  };
  return (
    <>
      <Modal
        title="Import Data"
        open={openUploadModel}
        onOk={handleOk}
        onCancel={() => {
          setOpenUploadModel(false);
          setDataExcel([]);
        }}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.{" "}
            <a
              onClick={(e) => e.stopPropagation()}
              className="text-blue-700"
              href={template}
              download
            >
              Download simple
            </a>
          </p>
        </Dragger>
        <Table
          dataSource={dataExcel}
          title={() => {
            return <span className="font-bold text-xl">Import Data:</span>;
          }}
          columns={[
            {
              dataIndex: "fullName",
              title: "Full Name",
            },
            {
              dataIndex: "email",
              title: "Email",
            },
            {
              dataIndex: "phone",
              title: "Phone",
            },
          ]}
        />
      </Modal>
    </>
  );
};

export default UserUploadModel;
