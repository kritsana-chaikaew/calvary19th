import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import device from "../utils/device";
import Gun from "./Gun";

const ModalWrapper = styled(Modal)`
  min-width: max-content !important;
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
    let cols = [];
    guns.sort((a, b) => {
      const aNo = parseInt(a.serial_no.replace(" ", ""), 10);
      const bNo = parseInt(b.serial_no.replace(" ", ""), 10);
      return aNo - bNo;
    });
    const wrap = Math.floor(Math.sqrt(guns.length) * 2);
    for (const [i, gun] of guns.entries()) {
      cols.push(
        <Col key={gun.id}>
          <Gun key={gun.id} onClick={() => onGunClick(gun)} data={gun} />
        </Col>
      );
      if ((i + 1) % wrap === 0) {
        slots.push(<Row key={i}>{cols}</Row>);
        cols = [];
      }
    }
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