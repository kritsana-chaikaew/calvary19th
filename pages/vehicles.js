import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Table, Tag } from "antd";
import { getVehicles } from "./api/vehicles/index";
import "antd/dist/antd.css";
import parseTime from "../utils/time";

const VehicleTable = ({ vehicles }) => {
  vehicles.forEach(function (vehicle) {
    vehicle.key = vehicle.id;
  });
  const columns = [
    {
      title: "หมายเลข",
      dataIndex: "serial_no",
      key: "serial_no",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "ประเภท`",
      dataIndex: "type",
      key: "type",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (status) => {
        const color = status === "พร้อมใช้" ? "green" : "volcano";
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "กองร้อย",
      dataIndex: "regimental",
      key: "regimental",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "ปรับปรุงเมื่อ",
      dataIndex: "updated_date",
      key: "updated_date",
      responsive: ["md", "lg", "xl"],
      render: (date) => parseTime(date),
    },
    {
      title: "ปรับปรุงโดย",
      dataIndex: "updated_by",
      key: "updated_by",
      responsive: ["lg", "xl"],
    },
  ];

  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <Table
      dataSource={vehicles}
      columns={columns}
      onRow={(record) => {
        return {
          onClick: (event) => handleClick(event, record),
        };
      }}
    />
  );
};
VehicleTable.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VehicleTable;

export async function getServerSideProps() {
  const vehicles = await getVehicles();
  return {
    props: { vehicles },
  };
}
