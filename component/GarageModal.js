import React from "react";
import { Modal, Button, Row, Col, Empty } from "antd";
import Image from "next/image";
import PropTypes from "prop-types";
import styled from "styled-components";
import device from "../utils/device";
import VehicleList from "./VehicleList";
import Vehicle from "../component/Vehicle";

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

const EmptyIcon = <Image layout="fill" src="/empty.svg" alt="empty" />;

const GarageModal = (props) => {
  const { vehicles, onVehicleClick, garage, onCancel, ...rest } = props;
  const List = VehicleList({vehicles, onVehicleClick});
  const slot = [...new Array(garage.row)];
  for (let i=0; i<garage.row; i++) {
    slot[i] = [...new Array(garage.col)].map(() => {
      return <Vehicle icon={EmptyIcon} />
    });
  }
  for (const vehicle of List) {
    slot[vehicle.props.data.row][vehicle.props.data.col] = vehicle;
  }
  const Slot = slot.map((row, index) => {
    return (
      <Row key={index}>
        {
          row.map((col, index) => {
            return (<Col key={index}>{col}</Col>);
          })
        }
      </Row>
    );
  });
  return (
    <ModalWrapper 
      title={garage?.name} 
      {...rest} 
      onCancel={onCancel}
      footer={[
        <Button 
          key="ok"
          onClick={onCancel}
          type="primary"
          size="large"
        >
          ปิด
        </Button>,
    ]}
    >
      <div className="container">
        {Slot}
      </div>
    </ModalWrapper>
  );
};
GarageModal.defaultProps = {
  vehicles: [],
  onVehicleClick: null,
  garage: null,
  onCancel: null
};
GarageModal.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.object),
  onVehicleClick: PropTypes.func,
  garage: PropTypes.objectOf(PropTypes.any),
  onCancel: PropTypes.func
};

export default GarageModal;