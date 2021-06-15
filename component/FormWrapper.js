/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Tag } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { statuses, types, regimentals, garages } from "../utils/const";
import ImageUpload from "./ImageUpload";

const statusOptions = statuses.map((status) => ({ value: status }));
const typeOptions = types.map((type) => ({ value: type.name }));
const regimentalOptions = regimentals.map((regimental) => ({
  value: regimental,
}));
const garageOptions = garages.map((garage) => ({ value: garage.name }));

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
  inUsedSlot,
  ...rest
}) => {
  const handleStatusChange = (value) => {
    form.setFieldsValue({
      status: [value[value.length - 1]],
    });
  };

  const [maxCol, setMaxCol] = useState(25);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCol, setSelectedCol] = useState(null);

  useEffect(() => {
    const garage = form.getFieldValue("garage");
    setMaxCol(garages.filter((g) => g.name === garage)[0]?.col || 25);
    const row = form.getFieldValue("row");
    const col = form.getFieldValue("col");
    setSelectedRow(row);
    setSelectedCol(col);
  }, [isOpen]);

  const validateMessages = {
    required: "กรุณาระบุ '${label}'",
    number: {
      range: "'${label}' อยู่ในช่วง ${min} และ ${max}",
    },
  };

  const rowOptions = (min, max) => {
    const options = [];
    for (let i = min; i <= max; i++) {
      if (selectedCol !== null && selectedCol !== undefined) {
        options.push({
          value: i,
          disabled: inUsedSlot[i - 1][selectedCol - 1],
        });
      } else {
        options.push({ value: i });
      }
    }
    return options;
  };

  const colOptions = (min, max) => {
    const options = [];
    for (let j = min; j <= max; j++) {
      if (selectedRow !== null && selectedRow !== undefined) {
        options.push({
          value: j,
          disabled: inUsedSlot[selectedRow - 1][j - 1],
        });
      } else {
        options.push({ value: j, disabled: true });
      }
    }
    return options;
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
        <Input type="number" readOnly={!isEdit} />
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
      <Form.Item label="อยู่ที่" name="garage" rules={[{ required: isEdit }]}>
        <Select
          disabled={!isEdit}
          style={{ width: "100%" }}
          options={garageOptions}
        />
      </Form.Item>
      <Form.Item label="จอดแถวที่" name="row" rules={[{ required: isEdit }]}>
        <Select
          disabled={!isEdit}
          style={{ width: "100%" }}
          options={rowOptions(1, 2)}
          onChange={(value) => setSelectedRow(value)}
        />
      </Form.Item>
      <Form.Item label="จอดช่องที่" name="col" rules={[{ required: isEdit }]}>
        <Select
          disabled={!isEdit}
          style={{ width: "100%" }}
          options={colOptions(1, maxCol)}
          onChange={(value) => setSelectedCol(value)}
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
  inUsedSlot: [],
};
FormWrapper.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  formItemLayout: PropTypes.objectOf(PropTypes.any),
  layout: PropTypes.string,
  isEdit: PropTypes.bool,
  isOpen: PropTypes.bool,
  inUsedSlot: PropTypes.arrayOf(PropTypes.array),
};

export default FormWrapper;
