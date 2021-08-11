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

  const updateRecord = async (newItem, newData) => {
    fetch("/api/clothes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => {
        if (res.ok) {
          setData(newData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const save = async (key) => {
    try {
      const changedRecord = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const oldItem = newData[index];
        const newItem = { ...oldItem, ...changedRecord };
        newData.splice(index, 1, newItem);
        updateRecord(newItem, newData);
        setEditingKey("");
      } else {
        newData.push(changedRecord);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const deleteRecord = async (record) => {
    fetch(`/api/clothes/${record.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          const newData = data.filter((item) => record.key !== item.key);
          setData(newData);
          setEditingKey("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <span>
            <Button disabled={editingKey !== ""} onClick={() => edit(record)}>
              แก้ไข
            </Button>
            <Popconfirm
              title="ยืนยันการลบ?"
              onConfirm={() => {
                deleteRecord(record);
              }}
            >
              <Button>`ลบ</Button>
            </Popconfirm>
          </span>
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
