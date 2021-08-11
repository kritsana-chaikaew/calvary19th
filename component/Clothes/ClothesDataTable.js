import React, { useState, useEffect } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Button } from "antd";
import PropTypes from "prop-types";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
EditableCell.defaultProps = {
  editing: null,
  dataIndex: null,
  title: null,
  inputType: null,
  record: null,
  index: null,
  children: null,
};
EditableCell.propTypes = {
  editing: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  inputType: PropTypes.string,
  record: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.any),
};

const ClothesDataTable = ({ clotheses }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    if (clotheses) {
      setData(clotheses);
    }
  }, [clotheses]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "no",
      dataIndex: "no",
      width: "5%",
      editable: false,
      sorter: {
        compare: (a, b) => a.no - b.no,
        multiple: 1,
      },
      sortOrder: "ascend",
    },
    {
      title: "list",
      dataIndex: "list",
      // width: "20%",
      editable: true,
    },
    {
      title: "count",
      dataIndex: "count",
      width: "5%",
      editable: true,
    },
    {
      title: "spend",
      dataIndex: "spend",
      width: "5%",
      editable: true,
    },
    {
      title: "lack",
      dataIndex: "lack",
      width: "5%",
      editable: true,
    },
    {
      title: "exeed",
      dataIndex: "exeed",
      width: "5%",
      editable: true,
    },
    {
      title: "remain",
      dataIndex: "remain",
      width: "5%",
      editable: true,
    },
    {
      title: "receive",
      dataIndex: "receive",
      width: "5%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              บันทึก
            </Button>
            <Popconfirm title="ยืนยันการยกเลิก?" onConfirm={cancel}>
              <Button>ยกเลิก</Button>
            </Popconfirm>
          </span>
        ) : (
          <Button disabled={editingKey !== ""} onClick={() => edit(record)}>
            แก้ไข
          </Button>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "list" ? "text" : "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
      shouldCellUpdate: (record, prevRecord) => {
        return (
          record[col.dataIndex] !== prevRecord[col.dataIndex] ||
          isEditing(record) ||
          editingKey === ""
        );
      },
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
ClothesDataTable.defaultProps = {
  clotheses: null,
};
ClothesDataTable.propTypes = {
  clotheses: PropTypes.arrayOf(PropTypes.any),
};

export default ClothesDataTable;
