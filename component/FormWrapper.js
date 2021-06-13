import React from "react";
import { Form, Input, Select, Tag } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { statuses, types } from "../utils/const";
import ImageUpload from "./ImageUpload";

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

const FormWrapper = ({ form, formItemLayout, layout, isEdit, ...rest }) => {
  const handleStatusChange = (value) => {
    form.setFieldsValue({
      status: [value[value.length - 1]],
    });
  };
  return (
    <Form
      {...formItemLayout}
      layout="horizontal"
      form={form}
      {...rest}
    >
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
        <Input.TextArea readOnly={!isEdit} type="text" placeholder="หมายเหตุ" />
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
          max="2"
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
        value=""
      >
        <ImageUpload isEdit={isEdit} />
      </Form.Item>
    </Form>
  );
};
FormWrapper.defaultProps = {
  form: null,
  formItemLayout: null,
  layout: null,
  isEdit: false,
};
FormWrapper.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  formItemLayout: PropTypes.objectOf(PropTypes.any),
  layout: PropTypes.string,
  isEdit: PropTypes.bool,
};

export default FormWrapper;
