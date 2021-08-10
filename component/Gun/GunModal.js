/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import GunFormWrapper from "./GunFormWrapper";
import device from "../../utils/device";

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
  symptom: "",
};

const GunModal = ({ gun, onOk, edit, visible, ...rest }) => {
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
          ...gun,
        });
      } else {
        const repair_slip =
          gun.repair_slip === ""
            ? []
            : [
                {
                  uid: "-1",
                  name: "ใบส่งซ่อม",
                  status: "done",
                  url: gun.repair_slip,
                },
              ];
        form.setFieldsValue({
          ...gun,
          status: [gun.status],
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
          fetch(`/api/guns/${id}`, config).then((response) => {
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
    let { repair_slip, status } = values;
    repair_slip = repair_slip[0]?.url || "";
    [status] = status;
    const headers = { "Content-Type": "application/json" };
    const body = {
      ...initValue,
      ...values,
      repair_slip,
      status,
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
      await makeRequest("/api/guns", values);
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
          onClick={() => showConfirm(gun.id)}
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
      <GunFormWrapper
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

GunModal.defaultProps = {
  gun: null,
  onOk: null,
  edit: false,
  visible: false,
};

GunModal.propTypes = {
  gun: PropTypes.objectOf(PropTypes.any),
  onOk: PropTypes.func,
  edit: PropTypes.bool,
  visible: PropTypes.bool,
};

export default GunModal;
