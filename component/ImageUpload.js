import React, { useState, useEffect } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ImageUpload = ({ isEdit, onFileChange, form }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (form.getFieldValue("repair_slip")) {
      setFileList([form.getFieldValue("repair_slip")]);
    }
  }, [form.getFieldValue("repair_slip")]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ file, fileList, event }) => {
    console.log(file, fileList, event);
    setFileList(fileList);
    onFileChange(fileList);
  };

  const handleRemove = (file) => {
    console.log(file);
    setFileList([]);
  };

  const uploadButton = (
    <div>
      <PlusOutlined style={{ margin: "auto" }} />
      <div style={{ margin: "auto" }}>Upload</div>
    </div>
  );
  return (
    <div>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        fileList={fileList}
        listType="picture-card"
        maxCount={1}
        multiple
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        showUploadList={{ showRemoveIcon: isEdit }}
        accept=".jpg,.jpeg,.png"
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};
ImageUpload.defaultProps = {
  isEdit: false,
  form: null,
  onFileChange: null,
};
ImageUpload.propTypes = {
  isEdit: PropTypes.bool,
  form: PropTypes.objectOf(PropTypes.func),
  onFileChange: PropTypes.func,
};

export default ImageUpload;
