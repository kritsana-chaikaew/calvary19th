import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import ClothesDataTable from "./ClothesDataTable";
import device from "../../utils/device";

const ModalWrapper = styled(Modal)`
  min-width: max-content !important;
  min-height: max-content;
  .ant-modal-content {
    height: 100%;
    display: flex !important;
    flex-flow: column nowrap;
    overflow: hidden;
  }
  .ant-modal-body {
    height: max-content;
    width: calc(var(--gun-size) * 22);
  }
  .ant-modal-title {
    font-size: 1.5rem;
  }
  @media ${device.xs} {
    .ant-modal-body {
      text-align: center;
    }
  }
  @media ${device.md} {
    .ant-modal-body {
      text-align: unset;
    }
  }
  .container {
    height: 100%;
  }
  .ant-row {
    min-height: var(--gun-size);
    flex-flow: row wrap;
  }
  .ant-col {
    min-height: var(--gun-size);
  }
  .ant-modal-header {
    padding-bottom: 0;
  }
  span.ant-modal-close-x {
    font-size: 1.5rem;
  }
  .unavailable {
    background-color: #d6d6d6 !important;
  }
  .unavailable:hover {
    background-color: transparent !important;
  }
  .ant-table-cell {
    padding: 4px;
  }
`;

const ClothesTypeModal = (props) => {
  const { clothesType, visible, tick, ...rest } = props;
  const [clotheses, setClotheses] = useState();

  useEffect(() => {
    fetch("/api/clothes")
      .then((res) => res.json())
      .then((data) => {
        const newData = [];
        for (const d of data) {
          if (d.type === clothesType) {
            newData.push({ ...d, key: d.id });
          }
        }
        setClotheses(newData);
      });
  }, [visible, tick, clothesType]);

  return (
    <ModalWrapper title={clothesType} {...rest} visible={visible} footer={null}>
      <div className="container">
        <ClothesDataTable clotheses={clotheses} />
      </div>
    </ModalWrapper>
  );
};

ClothesTypeModal.defaultProps = {
  clothesType: null,
};

ClothesTypeModal.propTypes = {
  clothesType: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  tick: PropTypes.bool.isRequired,
};

export default ClothesTypeModal;
