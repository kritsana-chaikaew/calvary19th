import React, { useEffect } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import device from "../../utils/device";

const ModalWrapper = styled(Modal)`
  width: max-content !important;
  min-height: max-content;
  .ant-modal-content {
    height: 100%;
    width: 100%;
    display: flex !important;
    flex-flow: column nowrap;
    overflow: hidden;
  }
  .ant-modal-body {
    overflow-x: scroll;
    height: max-content;
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
    min-height: var(--unit-size);
    width: 100%;
    flex-flow: row nowrap;
  }
  .ant-col {
    min-height: var(--unit-size);
  }
  .ant-modal-header {
    padding-bottom: 0;
  }
  span.ant-modal-close-x {
    font-size: 1.5rem;
  }
  .ant-modal-content {
    width: 520px;
  }
`;

const RegimentalModal = (props) => {
  const { regimental, visible, tick, children, ...rest } = props;

  useEffect(() => {}, [visible, tick]);

  return (
    <ModalWrapper title={regimental} {...rest} visible={visible} footer={null}>
      <div className="container">{children}</div>
    </ModalWrapper>
  );
};
RegimentalModal.defaultProps = {
  children: null,
};

RegimentalModal.propTypes = {
  regimental: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  tick: PropTypes.bool.isRequired,
  children: PropTypes.objectOf(PropTypes.any),
};

export default RegimentalModal;
