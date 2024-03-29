import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import Gun from "./Gun";
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
    background-color: red !important;
  }
  .empty {
    background-color: #d6d6d6 !important;
  }
  .empty:hover {
    background-color: transparent !important;
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
    guns.sort((a, b) => {
      return a < b;
    });
    for (const [i, gun] of guns.entries()) {
      cols.push(
        <Col key={i}>
          <Gun onClick={() => onGunClick(gun)} data={gun} />
        </Col>
      );
    }
    cols.push(
      <Col key="k">
        <Gun onClick={() => onGunClick({}, true)} data={{}} label="เพิ่ม" />
      </Col>
    );

    slots.push(<Row key="a">{cols}</Row>);

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
