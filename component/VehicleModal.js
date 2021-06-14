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
  repair_slip: "",
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
        form.setFieldsValue({
          ...vehicleData,
          status: [vehicleData.status],
          row: vehicleData.row + 1,
          col: vehicleData.col + 1,
          repair_slip: {
            uid: "-1",
            name: "ใบส่งซ่อม.png",
            status: "done",
            url: vehicleData.repair_slip,
          },
        });
      }
      setIsEdit(edit);
    }
  }, [visible]);
  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };
  const handleFileChange = (fileList) => {
    form.setFieldsValue({
      repair_slip: fileList,
    });
  };

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
      <FormWrapper
        formItemLayout={formItemLayout}
        layout="horizontal"
        form={form}
        isEdit={isEdit}
        onFileChange={handleFileChange}
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
