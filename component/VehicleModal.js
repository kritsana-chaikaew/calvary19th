import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select, Tag } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import { statuses, types } from "../utils/const";
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
  .ant-select-selector {
    background: transparent !important;
    cursor: text !important;
    color: unset !important;
  }
`;

const statusOptions = statuses.map(status => ({value: status}));
const typeOptions = types.map(type => ({value: type.name}));

const tagRender = (props) => {
  const { label, value, onClose } = props;
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
    label ? (
      <Tag
        icon={icon}
        color={color}
        onMouseDown={onPreventMouseDown}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    ) : ""
  );
};

const VehicleModal = ({ vehicleData, onOk, edit, visible, ...rest }) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const handleStatusChange = (value) => {
    form.setFieldsValue({
      status: [value[value.length - 1]]
    });
  };
  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };
  useEffect(() => {
    form.setFieldsValue({...vehicleData, status: [vehicleData.status]});
    setIsEdit(edit);
  }, [visible]);
  return (
    <ModalWrapper
      visible={visible}
      {...rest}
      footer={[
        <Button key="ok" onClick={onOk} type="primary" size="large">
          ปิด
        </Button>,
        <Button key="edit" onClick={handleEditClick} type="warning" size="large">
          {isEdit ? "บันทึก" : "แก้ไข"}
        </Button>,
      ]}
      centered
    >
      <Form {...formItemLayout} layout="horizontal" form={form}>
        <Form.Item name="id" rules={[{required: true}]}>
          <Input
            type="hidden"
            readOnly={!isEdit}
            value={({ getFieldValue }) => getFieldValue("id")}
          />
        </Form.Item>
        <Form.Item label="หมายเลข" name="serial_no" rules={[{required: true}]}>
          <Input
            type="text"
            readOnly={!isEdit}
            value={({ getFieldValue }) => getFieldValue("serial_no")}
            placeholder="หมายเลข"
          />
        </Form.Item>
        <Form.Item label="ชนิด" name="type" rules={[{required: true}]}>
          <Select
            disabled={!isEdit}
            value={({ getFieldValue }) => getFieldValue("type")}
            style={{ width: "100%" }}
            options={typeOptions}
            placeholder="ชนิด"
          />
        </Form.Item>
        <Form.Item label="สถานะ" name="status" rules={[{required: true}]}>
          <Select
            disabled={!isEdit}
            mode="tags"
            value={({ getFieldValue }) => getFieldValue("status")}
            onChange={handleStatusChange}
            tagRender={tagRender}
            style={{ width: "100%" }}
            options={statusOptions}
            placeholder="สถานะ"
          />
        </Form.Item>
        <Form.Item label="หมายเหตุ" name="symptom" rules={[{required: false}]}>
          <Input.TextArea
            readOnly={!isEdit}
            type="text"
            value={({ getFieldValue }) => getFieldValue("symptom")}
            placeholder="หมายเหตุ"
          />
        </Form.Item>
        <Form.Item label="กองร้อย" name="regimental" rules={[{required: true}]}>
          <Input
            readOnly={!isEdit}
            type="text"
            value={({ getFieldValue }) => getFieldValue("regimental")}
            placeholder="กองร้อย"
          />
        </Form.Item>
        <Form.Item label="อยู่ที่" name="garage" rules={[{required: true}]}>
          <Input
            readOnly={!isEdit}
            type="text"
            value={({ getFieldValue }) => getFieldValue("garage")}
            placeholder="อยู่ที่"
          />
        </Form.Item>
        <Form.Item label="จอดแถวที่" name="row" rules={[{required: true}]}>
          <Input
            readOnly={!isEdit}
            type="number"
            value={({ getFieldValue }) => getFieldValue("row") + 1}
            placeholder="จอดแถวที่"
          />
        </Form.Item>
        <Form.Item label="จอดช่องที่" name="col" rules={[{required: true}]}>
          <Input
            readOnly={!isEdit}
            type="number"
            value={({ getFieldValue }) => getFieldValue("col") + 1}
            placeholder="จอดช่องที่"
          />
        </Form.Item>
        <Form.Item label="ใบส่งซ่อม" name="type" rules={[{required: false}]}>
          <ImageUpload />
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

VehicleModal.defaultProps = {
  vehicleData: null,
  onOk: null,
  edit: false,
  visible: false
};

VehicleModal.propTypes = {
  vehicleData: PropTypes.objectOf(PropTypes.any),
  onOk: PropTypes.func,
  edit: PropTypes.bool,
  visible: PropTypes.bool
};

export default VehicleModal;
