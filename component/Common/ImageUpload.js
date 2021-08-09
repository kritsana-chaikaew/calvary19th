import React, { useState, useEffect } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import device from "../../utils/device";

const ModalWrapper = styled(Modal)`
  top: 0;
  img {
    max-height: 80vh;
    max-width: 50vw;
    object-fit: contain;
  }
  @media ${device.xs} {
    img {
      max-height: 90vh;
      max-width: 80vw;
      object-fit: contain;
    }
  }
  width: fit-content !important;
`;

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ImageUpload = ({ isEdit, form, isOpen }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setFiles(form.getFieldValue("repair_slip"));
    }
  }, [isOpen]);

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

  useEffect(() => {
    form.setFieldsValue({
      repair_slip: files,
    });
  }, [files]);

  const handleChange = ({ file }) => {
    if (file.status === "uploading") {
      setFiles([file]);
      return;
    }
    if (file.status === "error") {
      handleRemove();
    }
    if (file.status === "done") {
      setFiles([file.response]);
    }
  };

  const handleRemove = () => {
    setFiles([]);
  };

  const uploadButton = (
    <div>
      <PlusOutlined style={{ margin: "auto" }} />
      <div style={{ margin: "auto" }}>อัปโหลด</div>
    </div>
  );
  return (
    <div>
      <Upload
        action="/api/upload"
        fileList={files}
        listType="picture-card"
        maxCount={1}
        multiple
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        showUploadList={{ showRemoveIcon: isEdit }}
        accept=".jpg,.jpeg,.png"
        disabled={!isEdit}
      >
        {files.length >= 1 ? null : uploadButton}
      </Upload>
      <ModalWrapper
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </ModalWrapper>
    </div>
  );
};
ImageUpload.defaultProps = {
  isEdit: false,
  form: null,
  isOpen: false,
};
ImageUpload.propTypes = {
  isEdit: PropTypes.bool,
  form: PropTypes.objectOf(PropTypes.any),
  isOpen: PropTypes.bool,
};

export default ImageUpload;
