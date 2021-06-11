import React from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import device from "../utils/device";
import VehicleList from "./VehicleList";

const ModalWrapper = styled(Modal)`
  width: 70vw !important;
  min-height: 50vh;
  .ant-modal-content {
    height: 100%;
    width: 100%;
    display: flex !important;
    flex-flow: column nowrap;
  }
  .ant-modal-body {
    overflow: scroll;
    height: 300px;
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
`;

const GarageModal = (props) => {
  const { vehicles, onVehicleClick, name, onCancel, ...rest } = props;
  return (
    <ModalWrapper 
      title={name} 
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
        {name ? (
          <VehicleList
            vehicles={vehicles}
            onVehicleClick={onVehicleClick}
          />
        ) : (
          ""
        )}
      </div>
    </ModalWrapper>
  );
};
GarageModal.defaultProps = {
  vehicles: [],
  onVehicleClick: null,
  name: "",
  onCancel: null
};
GarageModal.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.object),
  onVehicleClick: PropTypes.func,
  name: PropTypes.string,
  onCancel: PropTypes.func
};

export default GarageModal;