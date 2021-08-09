/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import device from "../../utils/device";
import FormWrapper from "./FormWrapper";

const { confirm } = Modal;

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
  row: null,
  col: null,
};

const VehicleModal = ({
  vehicleData,
  onOk,
  edit,
  visible,
  inUsedSlot,
  selectedGarageName,
  clickedRow,
  clickedCol,
  ...rest
}) => {
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
        form.setFieldsValue({
          ...initValue,
          garage: selectedGarageName,
          row: clickedRow >= 0 ? clickedRow + 1 : null,
          col: clickedCol >= 0 ? clickedCol + 1 : null,
        });
      } else {
        const repair_slip =
          vehicleData.repair_slip === ""
            ? []
            : [
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
    onOk();
  };

  const showConfirm = (id) => {
    confirm({
      title: "ต้องการลบข้อมูลใช่หรือไม่?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "ใช่ ลบเลย",
      okType: "danger",
      cancelText: "ไม่ใช่",
      onOk() {
        return new Promise((resolve, reject) => {
          const config = { method: "DELETE" };
          fetch(`/api/vehicles/${id}`, config).then((response) => {
            if (response.ok) {
              resolve(response);
            } else {
              reject(new Error("error"));
            }
            onOk();
          });
        }).catch(() => console.log("Oops errors"));
      },
      onCancel() {
        console.log("ไม่ใช่");
        onOk();
      },
    });
  };

  const makeRequest = async (url, values) => {
    // eslint-disable-next-line camelcase
    const method = edit ? "POST" : "PUT";
    let { repair_slip, status, row, col } = values;
    repair_slip = repair_slip[0]?.url || "";
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
    if (isEdit) {
      form.submit();
    } else {
      setIsEdit(true);
    }
  };

  const onFinish = async (values) => {
    try {
      await makeRequest("/api/vehicles", values);
      setIsEdit(false);
    } catch (e) {
      console.log(e);
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
        <Button
          key="delete"
          onClick={() => showConfirm(vehicleData.id)}
          type="danger"
          size="large"
        >
          ลบ
        </Button>,

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
        inUsedSlot={inUsedSlot}
      />
    </ModalWrapper>
  );
};

VehicleModal.defaultProps = {
  vehicleData: null,
  onOk: null,
  edit: false,
  visible: false,
  inUsedSlot: [],
  clickedRow: null,
  clickedCol: null,
};

VehicleModal.propTypes = {
  vehicleData: PropTypes.objectOf(PropTypes.any),
  onOk: PropTypes.func,
  edit: PropTypes.bool,
  visible: PropTypes.bool,
  inUsedSlot: PropTypes.arrayOf(PropTypes.array),
  selectedGarageName: PropTypes.string.isRequired,
  clickedRow: PropTypes.number,
  clickedCol: PropTypes.number,
};

export default VehicleModal;
