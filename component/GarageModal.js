import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import device from "../utils/device";
import Vehicle from "./Vehicle";

const ModalWrapper = styled(Modal)`
  width: max-content !important;
  min-height: max-content;
  .ant-modal-content {
    height: 100%;
    width: 100%;
    display: flex !important;
    flex-flow: column nowrap;
  }
  .ant-modal-body {
    overflow: scroll;
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
    overflow: scroll;
  }
  .ant-row {
    min-height: var(--unit-size);
    width: 100%;
    flex-flow: row nowrap;
  }
  .ant-col {
    min-height: var(--unit-size);
  }
`;

const GarageModal = (props) => {
  const {
    garage,
    vehicles,
    onVehicleClick,
    onGarageOpen,
    visible,
    isModalVisible,
    isAddModalVisible,
    tick,
    ...rest
  } = props;
  const [vehicleSlots, setVehicleSlots] = useState();

  useEffect(() => {
    const slot = renderSlot();
    setVehicleSlots(slot);
  }, [visible, tick]);

  const renderSlot = () => {
    const slots = [];
    const inUsed = [];
    for (let i = 0; i < garage.row; i++) {
      const cols = [];
      const inUsedCol = [];
      for (let j = 0; j < garage.col; j++) {
        cols.push(
          <Col key={`${i}-${j}`}>
            <Vehicle />
          </Col>
        );
        inUsedCol.push(false);
      }
      slots.push(<Row key={`row-${i}`}>{cols}</Row>);
      inUsed.push(inUsedCol);
    }

    for (const vehicle of vehicles) {
      slots[vehicle.row].props.children[vehicle.col] = (
        <Col key={`${vehicle.row}-${vehicle.col}`}>
          <Vehicle onClick={() => onVehicleClick(vehicle)} data={vehicle} />
        </Col>
      );
      inUsed[vehicle.row][vehicle.col] = true;
    }
    onGarageOpen(inUsed);

    return slots;
  };

  return (
    <ModalWrapper
      title={garage?.name}
      {...rest}
      visible={visible}
      footer={null}
    >
      <div className="container">{vehicleSlots}</div>
    </ModalWrapper>
  );
};

GarageModal.defaultProps = {
  vehicles: [],
  onVehicleClick: null,
  garage: null,
  onGarageOpen: null,
};

GarageModal.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.object),
  onVehicleClick: PropTypes.func,
  garage: PropTypes.objectOf(PropTypes.any),
  onGarageOpen: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  isAddModalVisible: PropTypes.bool.isRequired,
  tick: PropTypes.bool.isRequired,
};

export default GarageModal;
