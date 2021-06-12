import React from "react";
import { Modal, Image, Row, Col, Tag, Button, Divider } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import styled from "styled-components";
import { statuses } from "../utils/const";
import parseTime from "../utils/time";
import device from "../utils/device";

const ModalWrapper = styled(Modal)`
  min-height: 70vh;
  width: 650px !important;
  .ant-modal-content {
    height: 100%;
    width: 100%;
    display: flex !important;
    flex-flow: column nowrap;
  }
  .ant-modal-body {
    overflow: scroll;
    // height: 400px;
  }
  .ant-modal-title {
    font-size: 1.5rem;
  }
  .ant-tag > span > * {
    display: inline;
    color: inherit;
  }
  .ant-tag {
    font-size: 1em;
    display: flex;
    align-items: center;
  }
  @media ${device.xs} {
    h2 {
      font-size: 1.1em;
    }
  }
`;

const RowWrapper = styled(Row)`
  min-height: var(--unit-size);
`;

const VehicleModal = ({ vehicleData, onOk, ...rest }) => {
  let color = "success";
  let icon = <CheckCircleOutlined />;
  const isUnavailable = vehicleData?.status === statuses[1];
  const isDisable = vehicleData?.status === statuses[2];
  if (isUnavailable) {
    color = "error";
    icon = <CloseCircleOutlined />;
  }
  if (isDisable) {
    color = "default";
    icon = <MinusCircleOutlined />;
  }
  return (
    <ModalWrapper
      {...rest}
      footer={[
        <Button key="ok" onClick={onOk} type="primary" size="large">
          ปิด
        </Button>,
      ]}
      centered
    >
      <RowWrapper>
        <Col span={8}>
          <RowWrapper>
            <h2>
              <strong>หมายเลข</strong>
            </h2>
          </RowWrapper>
          <RowWrapper>
            <h2>
              <strong>สถานะ</strong>
            </h2>
          </RowWrapper>
          <RowWrapper>
            <h2>
              <strong>ชนิด</strong>
            </h2>
          </RowWrapper>
          <RowWrapper>
            <h2>
              <strong>อยู่ที่</strong>
            </h2>
          </RowWrapper>
        </Col>
        <Col span={16}>
          <RowWrapper>
            <h2>{vehicleData.serial_no}</h2>
          </RowWrapper>
          <RowWrapper>
            <Tag icon={icon} color={color}>
              <h2>{vehicleData?.status}</h2>
            </Tag>
          </RowWrapper>
          <RowWrapper>
            <h2>{vehicleData?.type}</h2>
          </RowWrapper>
          <RowWrapper>
            <h2>
              {`${vehicleData?.garage} แถวที่ ${vehicleData?.row + 1} ช่องที่ ${
                vehicleData?.col + 1
              }`}
            </h2>
          </RowWrapper>
        </Col>
      </RowWrapper>
      {isUnavailable && (
        <Divider>
          <i>ข้อมูลการซ่อม</i>
        </Divider>
      )}
      {isUnavailable && (
        <RowWrapper>
          <Col span={8}>
            <h2>
              <strong>วันส่งซ่อม</strong>
            </h2>
          </Col>
          <Col span={16}>
            <h2>{parseTime(vehicleData?.updated_date)}</h2>
          </Col>
        </RowWrapper>
      )}
      {isUnavailable && (
        <RowWrapper>
          <Col span={8}>
            <h2>
              <strong>ใบส่งซ่อม</strong>
            </h2>
          </Col>
          <Col span={16}>
            <Image width={60} src={vehicleData?.repair_slip}>
              <strong>ใบส่งซ่อม</strong>
            </Image>
          </Col>
        </RowWrapper>
      )}
    </ModalWrapper>
  );
};

VehicleModal.defaultProps = {
  vehicleData: null,
  onOk: null,
};

VehicleModal.propTypes = {
  vehicleData: PropTypes.objectOf(PropTypes.any),
  onOk: PropTypes.func,
};

export default VehicleModal;
