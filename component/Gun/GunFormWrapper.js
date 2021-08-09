/* eslint-disable no-template-curly-in-string */
import React from "react";
import { Form, Input, Select, Tag } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { statuses, gunTypes, regimentals } from "../../utils/const";
import ImageUpload from "../Common/ImageUpload";

const statusOptions = statuses.map((status) => ({ value: status }));
const typeOptions = gunTypes.map((type) => ({ value: type.name }));
const regimentalOptions = regimentals.map((regimental) => ({
  value: regimental,
}));

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

  return label ? (
    <Tag icon={icon} color={color} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  ) : (
    ""
  );
};

const FormWrapper = ({
  form,
  formItemLayout,
  layout,
  isEdit,
  isOpen,
  ...rest
}) => {
  const handleStatusChange = (value) => {
    form.setFieldsValue({
      status: [value[value.length - 1]],
    });
  };

  const validateMessages = {
    required: "กรุณาระบุ '${label}'",
    number: {
      range: "'${label}' อยู่ในช่วง ${min} และ ${max}",
    },
  };

  return (
    <Form
      {...formItemLayout}
      layout="horizontal"
      form={form}
      {...rest}
      validateMessages={validateMessages}
    >
      <Form.Item name="id" rules={[{ required: false }]}>
        <Input type="hidden" readOnly />
      </Form.Item>
      <Form.Item
        label="หมายเลข"
        name="serial_no"
        rules={[{ required: isEdit }]}
      >
        <Input type="text" readOnly={!isEdit} />
      </Form.Item>
      <Form.Item label="ชนิด" name="type" rules={[{ required: isEdit }]}>
        <Select
          disabled={!isEdit}
          style={{ width: "100%" }}
          options={typeOptions}
          showSearch={false}
        />
      </Form.Item>
      <Form.Item label="สถานะ" name="status" rules={[{ required: isEdit }]}>
        <Select
          disabled={!isEdit}
          mode="multiple"
          onChange={handleStatusChange}
          tagRender={tagRender}
          style={{ width: "100%" }}
          options={statusOptions}
          showSearch={false}
        />
      </Form.Item>
      <Form.Item label="หมายเหตุ" name="symptom" rules={[{ required: false }]}>
        <Input.TextArea readOnly={!isEdit} type="text" />
      </Form.Item>
      <Form.Item
        label="กองร้อย"
        name="regimental"
        rules={[{ required: isEdit }]}
      >
        <Select
          disabled={!isEdit}
          style={{ width: "100%" }}
          options={regimentalOptions}
        />
      </Form.Item>
      <Form.Item
        label="ใบส่งซ่อม"
        name="repair_slip"
        rules={[{ required: false }]}
      >
        <ImageUpload isEdit={isEdit} form={form} isOpen={isOpen} />
      </Form.Item>
    </Form>
  );
};
FormWrapper.defaultProps = {
  form: null,
  formItemLayout: null,
  layout: null,
  isEdit: false,
  isOpen: false,
};
FormWrapper.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  formItemLayout: PropTypes.objectOf(PropTypes.any),
  layout: PropTypes.string,
  isEdit: PropTypes.bool,
  isOpen: PropTypes.bool,
};

export default FormWrapper;
