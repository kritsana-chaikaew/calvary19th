/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import device from "../utils/device";
import FormWrapper from "./FormWrapper";

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

const initValue = {
  id: "",
  type: "",
  status: [],
  regimental: "",
  serial_no: "",
  repair_slip: [],
  image: "",
  created_date: "",
  created_by: "",
  updated_date: "",
  updated_by: "",
  garage: "",
  symptom: "",
  row: 1,
  col: 1,
};

const VehicleModal = ({ vehicleData, onOk, edit, visible, ...rest }) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 12,
    },
  };
  useEffect(() => {
    if (visible) {
      if (edit) {
        form.setFieldsValue(initValue);
      } else {
        const repair_slip = vehicleData.repair_slip === "" ? [] : [
          {
            uid: "-1",
            name: "ใบส่งซ่อม",
            status: "done",
            url: vehicleData.repair_slip,
          },
        ];
        form.setFieldsValue({
          ...vehicleData,
          status: [vehicleData.status],
          row: vehicleData.row + 1,
          col: vehicleData.col + 1,
          repair_slip,
        });
      }
      setIsEdit(edit);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [visible]);

  const handleModalClose = () => {
    // form.resetFields();
    onOk();
  };

  const makeRequest = async (url, values) => {
    // eslint-disable-next-line camelcase
    const method = edit ? "POST" : "PUT";
    console.log(values);
    let { repair_slip, status, row, col } = values;
    console.log(repair_slip);
    repair_slip = repair_slip[0]?.url || "";
    console.log(repair_slip);
    [status] = status;
    row -= 1;
    col -= 1;
    const headers = { "Content-Type": "application/json" };
    const body = {
      ...initValue,
      ...values,
      repair_slip,
      status,
      row,
      col,
    };
    const config = {
      method,
      headers,
      body: JSON.stringify(body),
    };
    const response = await fetch(url, config);
    return response.json();
  };

  const onEditOrSubmit = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    if (isEdit) {
      try {
        const res = await makeRequest("/api/vehicles", values);
        console.log(res);
        setIsEdit(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsEdit(true);
    }
  };

  const onFinishFailed = () => {
    console.log("fail");
  };

  return (
    <ModalWrapper
      visible={visible}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      {...rest}
      footer={[
        <Button key="ok" onClick={handleModalClose} type="primary" size="large">
          ปิด
        </Button>,

        <Button
          key="edit"
          onClick={onEditOrSubmit}
          type="warning"
          size="large"
          htmlType="submit"
        >
          {isEdit ? "บันทึก" : "แก้ไข"}
        </Button>,
      ]}
      centered
    >
      <FormWrapper
        formItemLayout={formItemLayout}
        layout="horizontal"
        form={form}
        isEdit={isEdit}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isOpen={isOpen}
      />
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
