import React from "react";
import { Modal, Row, Col } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import device from "../utils/device";
import Vehicle from "./Vehicle";

const ModalWrapper = styled(Modal)`
  width: max-content !important;
  min-height: max-contentvh;
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
  }
  .ant-row {
    min-height: var(--unit-size);
    width: 100%;
  }
  .ant-col {
    min-height: var(--unit-size);
    min-width: var(--unit-size);
  }
`;

const GarageModal = (props) => {
  const { garage, vehicles, onVehicleClick, ...rest } = props;

  const renderSlot = (garage) => {
    const slots = [];
    for (let i = 0; i < garage.row; i++) {
      const cols = [];
      for (let j = 0; j < garage.col; j++) {
        cols.push(
          <Col>
            <Vehicle />
          </Col>
        );
      }
      slots.push(<Row>{cols}</Row>);
    }

    for (const vehicle of vehicles) {
      slots[vehicle.row][vehicle.col] = (
        <Vehicle onClick={() => onVehicleClick(vehicle)} data={vehicle} />
      );
    }

    return slots;
  };

  return (
    <ModalWrapper title={garage?.name} {...rest} footer={null}>
      <div className="container">{renderSlot(garage)}</div>
    </ModalWrapper>
  );
};

GarageModal.defaultProps = {
  vehicles: [],
  onVehicleClick: null,
  garage: null,
};

GarageModal.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.object),
  onVehicleClick: PropTypes.func,
  garage: PropTypes.objectOf(PropTypes.any),
};

export default GarageModal;
