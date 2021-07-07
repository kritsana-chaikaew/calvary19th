import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import device from "../utils/device";
import Gun from "./Gun";

const ModalWrapper = styled(Modal)`
  min-width: 520px !important;
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
`;

const GunGroupModal = (props) => {
  const { guns, onGunClick, title, visible, tick, ...rest } = props;
  const [gunSlots, setGunSlot] = useState();

  useEffect(() => {
    const slots = renderSlot();
    setGunSlot(slots);
  }, [visible, tick]);

  const renderSlot = () => {
    const slots = [];
    const cols = [];
    for (const gun of guns) {
      cols.push(
        <Col key={gun.id}>
          <Gun key={gun.id} onClick={() => onGunClick(gun)} data={gun} />
        </Col>
      );
    }
    slots.push(<Row key="1">{cols}</Row>);

    return slots;
  };

  return (
    <ModalWrapper title={title} {...rest} visible={visible} footer={null}>
      <div className="container">{gunSlots}</div>
    </ModalWrapper>
  );
};

GunGroupModal.defaultProps = {
  guns: [],
  onGunClick: null,
  title: null,
};

GunGroupModal.propTypes = {
  guns: PropTypes.arrayOf(PropTypes.object),
  onGunClick: PropTypes.func,
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  tick: PropTypes.bool.isRequired,
};

export default GunGroupModal;
