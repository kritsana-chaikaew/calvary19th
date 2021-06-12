import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, Tag } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import { statuses } from "../utils/const";
import device from "../utils/device";
import ImageUpload from "./ImageUpload";

const ModalWrapper = styled(Modal)`
  min-height: 70vh;
  width: 650px !important;
  .ant-modal-content {
    height: 100%;
    width: 100%;
    display: flex !important;
    flex-flow: column nowrap;
  }
  .ant-modal-body {
    overflow: scroll;
  }
  .ant-modal-title {
    font-size: 1.5rem;
  }
  .ant-tag > span > * {
    display: inline;
    color: inherit;
  }
  .ant-tag {
    font-size: 1em;
    display: flex;
    align-items: center;
  }
  @media ${device.xs} {
    h2 {
      font-size: 1.1em;
    }
  }
  .ant-form-item {
    margin-bottom: 5px;
  }
`;

const statusOptions = statuses.map(status => ({value: status}));

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  let color = "success";
  let icon = <CheckCircleOutlined />;
  if (value === statuses[1]) {
    color = "error";
    icon = <CloseCircleOutlined />;
  } else if (value === statuses[2]) {
    color = "default";
    icon = <MinusCircleOutlined />;
  }
  const onPreventMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      icon={icon}
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const VehicleModal = ({ vehicleData, onOk, ...rest }) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 10,
    },
  };

  return (
    <ModalWrapper
      {...rest}
      footer={[
        <Button key="ok" onClick={onOk} type="primary" size="large">
          ปิด
        </Button>,
      ]}
      centered
    >
      <Form {...formItemLayout} layout="horizontal" form={form}>
        <Form.Item label="หมายเลข">
          <Input
            type="text"
            readOnly
            value={vehicleData?.serial_no}
            placeholder="หมายเลข"
          />
        </Form.Item>
        <Form.Item label="ชนิด">
          <Input
            type="text"
            readOnly
            value={vehicleData?.type}
            placeholder="ชนิด"
          />
        </Form.Item>
        <Form.Item label="สถานะ">
          <Select
            readOnly
            mode="multiple"
            value={[vehicleData?.status]}
            onChange={handleStatusChange}
            tagRender={tagRender}
            style={{ width: "100%" }}
            options={statusOptions}
          />
        </Form.Item>
        <Form.Item label="หมายเหตุ">
          <Input.TextArea
            type="text"
            readOnly
            value={vehicleData?.symptom}
            placeholder="หมายเหตุ"
          />
        </Form.Item>
        <Form.Item label="กองร้อย">
          <Input
            type="text"
            readOnly
            value={vehicleData?.regimental}
            placeholder="กองร้อย"
          />
        </Form.Item>
        <Form.Item label="โรงรถ">
          <Input
            type="text"
            readOnly
            value={vehicleData?.garage}
            placeholder="โรงรถ"
          />
        </Form.Item>
        <Form.Item label="แถวจอด">
          <Input
            type="number"
            readOnly
            value={vehicleData?.row}
            placeholder="แถวจอด"
          />
        </Form.Item>
        <Form.Item label="ช่องจอด">
          <Input
            type="number"
            readOnly
            value={vehicleData?.col}
            placeholder="ช่องจอด"
          />
        </Form.Item>
        <Form.Item label="ใบส่งซ่อม">
          <ImageUpload />
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};
VehicleModal.defaultProps = {
  vehicleData: null,
  onOk: null,
};
VehicleModal.propTypes = {
  vehicleData: PropTypes.objectOf(PropTypes.any),
  onOk: PropTypes.func,
};

export default VehicleModal;
