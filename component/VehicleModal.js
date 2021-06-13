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

const statusOptions = statuses.map((status) => ({ value: status }));
const typeOptions = types.map((type) => ({ value: type.name }));

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
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return label ? (
    <Tag
      icon={icon}
      color={color}
      onMouseDown={onPreventMouseDown}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  ) : (
    ""
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
      status: [value[value.length - 1]],
    });
  };
  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };
  useEffect(() => {
    form.setFieldsValue({
      ...vehicleData,
      status: [vehicleData.status],
      row: vehicleData.row + 1,
      col: vehicleData.col + 1,
    });
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
        <Button
          key="edit"
          onClick={handleEditClick}
          type="warning"
          size="large"
        >
          {isEdit ? "บันทึก" : "แก้ไข"}
        </Button>,
      ]}
      centered
    >
      <Form {...formItemLayout} layout="horizontal" form={form}>
        <Form.Item name="id" rules={isEdit ? [{ required: true }] : null}>
          <Input type="hidden" readOnly={!isEdit} />
        </Form.Item>
        <Form.Item
          label="หมายเลข"
          name="serial_no"
          rules={isEdit ? [{ required: true }] : null}
        >
          <Input type="text" readOnly={!isEdit} placeholder="หมายเลข" />
        </Form.Item>
        <Form.Item
          label="ชนิด"
          name="type"
          rules={isEdit ? [{ required: true }] : null}
        >
          <Select
            disabled={!isEdit}
            style={{ width: "100%" }}
            options={typeOptions}
            placeholder="ชนิด"
          />
        </Form.Item>
        <Form.Item
          label="สถานะ"
          name="status"
          rules={isEdit ? [{ required: true }] : null}
        >
          <Select
            disabled={!isEdit}
            mode="tags"
            onChange={handleStatusChange}
            tagRender={tagRender}
            style={{ width: "100%" }}
            options={statusOptions}
            placeholder="สถานะ"
          />
        </Form.Item>
        <Form.Item
          label="หมายเหตุ"
          name="symptom"
          rules={isEdit ? [{ required: true }] : null}
        >
          <Input.TextArea
            readOnly={!isEdit}
            type="text"
            placeholder="หมายเหตุ"
          />
        </Form.Item>
        <Form.Item
          label="กองร้อย"
          name="regimental"
          rules={isEdit ? [{ required: true }] : null}
        >
          <Input readOnly={!isEdit} type="text" placeholder="กองร้อย" />
        </Form.Item>
        <Form.Item
          label="อยู่ที่"
          name="garage"
          rules={isEdit ? [{ required: true }] : null}
        >
          <Input readOnly={!isEdit} type="text" placeholder="อยู่ที่" />
        </Form.Item>
        <Form.Item
          label="จอดแถวที่"
          name="row"
          rules={isEdit ? [{ required: true }] : null}
        >
          <Input
            readOnly={!isEdit}
            type="number"
            placeholder="จอดแถวที่"
            max="25"
            min="0"
          />
        </Form.Item>
        <Form.Item
          label="จอดช่องที่"
          name="col"
          rules={isEdit ? [{ required: true }] : null}
        >
          <Input
            readOnly={!isEdit}
            type="number"
            placeholder="จอดช่องที่"
            max="25"
            min="0"
          />
        </Form.Item>
        <Form.Item
          label="ใบส่งซ่อม"
          name="type"
          rules={isEdit ? [{ required: false }] : null}
        >
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
  visible: false,
};

VehicleModal.propTypes = {
  vehicleData: PropTypes.objectOf(PropTypes.any),
  onOk: PropTypes.func,
  edit: PropTypes.bool,
  visible: PropTypes.bool,
};

export default VehicleModal;
