import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Popconfirm,
  Row,
  Table,
  message,
  notification,
} from "antd";
import InputSearch from "./InputSearch";
import { deleteUser, fetchListUser } from "../../../service/api";
import { IoEyeSharp } from "react-icons/io5";
import UserViewDetail from "./UserViewDetail";
import { IoRefreshSharp } from "react-icons/io5";
import UserCreateModel from "./UserCreateModel";
import * as xlsx from "xlsx";
import { ExportOutlined } from "@ant-design/icons";
import UserUploadModel from "./UserUploadModel";
import { MdOutlineEdit } from "react-icons/md";
import UserModelUpdate from "./UserModelUpdate";
import { MdOutlineDeleteOutline } from "react-icons/md";
const LayoutUser = () => {
  const [ListUser, setLisUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sorterQuery, setSorterQuery] = useState("");
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [dataViewDetails, setDataViewDetails] = useState(null);
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [openUploadModel, setOpenUploadModel] = useState(false);

  const [openModelUpdate, setOpenModelUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const columns = [
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Ngày tạo user",
      dataIndex: "createdAt",
      sorter: true,
    },
    {
      title: "Ngày sửa user",
      dataIndex: "updatedAt",
      sorter: true,
    },
    {
      title: "Action",
      render: (index, record) => {
        return (
          <div className="flex gap-4">
            <IoEyeSharp
              className="text-blue-500 text-xl cursor-pointer"
              onClick={() => {
                setOpenViewDetails(true);
                setDataViewDetails(record);
              }}
            ></IoEyeSharp>

            <MdOutlineEdit
              className="text-yellow-500 text-xl cursor-pointer"
              onClick={() => {
                setOpenModelUpdate(true);
                setDataUpdate(record);
              }}
            ></MdOutlineEdit>

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <MdOutlineDeleteOutline className="text-red-500 text-xl cursor-pointer"></MdOutlineDeleteOutline>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    fetchListDataUser();
  }, [current, pageSize, filter, sorterQuery]);
  const fetchListDataUser = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sorterQuery) {
      query += `&${sorterQuery}`;
    }
    const res = await fetchListUser(query);
    if (res && res.data) {
      setLisUser(res.data.data.result);
      setTotal(res.data.data.meta.total);
    }
  };
  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(pagination.current);
    }
    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setSorterQuery(q);
    }
  };
  const handleSearch = (query) => {
    setCurrent(1);
    setFilter(query);
  };
  console.log("check dataupdate", dataUpdate);
  const handleExportUser = () => {
    if (ListUser.length > 0) {
      const worksheet = xlsx.utils.json_to_sheet(ListUser);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      xlsx.writeFile(workbook, "ExportUser.csv");
    }
  };
  const handleDelete = async (userId) => {
    const res = await deleteUser(userId);
    if (res.data) {
      message.success("Delete user thanh cong");
      fetchListDataUser();
    } else {
      message.error("Delete user that bai");
    }
  };
  const renderHeader = () => {
    return (
      <div className="flex justify-between">
        <span className="font-bold text-3xl">Table User</span>
        <span className="flex items-center gap-4">
          <Button
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => handleExportUser()}
          >
            Export
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setOpenUploadModel(true);
            }}
          >
            Import
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setOpenCreateModel(true);
            }}
          >
            Thêm mới
          </Button>
          <Button type="ghost">
            <IoRefreshSharp className="text-2xl"></IoRefreshSharp>
          </Button>
        </span>
      </div>
    );
  };
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch
            handleSearch={handleSearch}
            setFilter={setFilter}
          ></InputSearch>
        </Col>
        <Col span={24}>
          <Table
            title={renderHeader}
            columns={columns}
            dataSource={ListUser}
            onChange={onChange}
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              showTotal: (total, range) => {
                return (
                  <div>
                    {" "}
                    {range[0]}-{range[1]} trên {total} rows
                  </div>
                );
              },
              total: total,
            }}
          />
        </Col>
      </Row>
      <UserViewDetail
        setOpenViewDetails={setOpenViewDetails}
        openViewDetails={openViewDetails}
        dataViewDetails={dataViewDetails}
        setDataViewDetails={setDataViewDetails}
      ></UserViewDetail>

      <UserCreateModel
        openCreateModel={openCreateModel}
        setOpenCreateModel={setOpenCreateModel}
        fetchListDataUser={fetchListDataUser}
      ></UserCreateModel>

      <UserUploadModel
        openUploadModel={openUploadModel}
        setOpenUploadModel={setOpenUploadModel}
      ></UserUploadModel>

      <UserModelUpdate
        openModelUpdate={openModelUpdate}
        setOpenModelUpdate={setOpenModelUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchListDataUser={fetchListDataUser}
      ></UserModelUpdate>
    </>
  );
};

export default LayoutUser;
