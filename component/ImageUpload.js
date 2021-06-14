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

const ImageUpload = ({ isEdit, form }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (form.getFieldValue("repair_slip")) {
      setFiles(form.getFieldValue("repair_slip"));
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

  const handleChange = ({ file, fileList }) => {
    setFiles(fileList);
    if (["done", "remove"].includes(file.status)) {
      form.setFieldsValue({
        repair_slip: files
      });
    }
  };

  const handleRemove = () => {
    setFiles([]);
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
        fileList={files}
        listType="picture-card"
        maxCount={1}
        multiple
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        showUploadList={{ showRemoveIcon: isEdit }}
        accept=".jpg,.jpeg,.png"
      >
        {files.length >= 1 ? null : uploadButton}
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
};
ImageUpload.propTypes = {
  isEdit: PropTypes.bool,
  form: PropTypes.objectOf(PropTypes.any),
};

export default ImageUpload;
