import React from "react";
import { Modal, Image, Row, Col, Tag, Button } from "antd";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { statuses } from "../utils/const";

const VehicleDetail = ({ vehicleData, onOk, ...rest }) => {
  let color = "success";
  let icon = <CheckCircleOutlined />;
  if (vehicleData?.status === statuses[1]) {
    color = "error";
    icon = <CloseCircleOutlined />;
  }
  if (vehicleData?.status === statuses[2]) {
    color = "default";
    icon = <MinusCircleOutlined />;
  }
  return (
    <Modal
      {...rest}
      footer={[
        <Button key="นา" onClick={onOk} type="primary">
          ตกลง
        </Button>,
      ]}
    >
      <Row>
        <Col span={10}>
          <Image width={120} height={100} src={vehicleData?.image} />
        </Col>
        <Col span={6}>
          <Row>หมายเลข</Row>
          <Row>สถานะ</Row>
          <Row>ชนิด</Row>
          <Row>กองร้อย</Row>
          <Row>ใบส่งซ่อม</Row>
        </Col>
        <Col span={8}>
          <Row>{vehicleData.serial_no}</Row>
          <Row>
            <Tag icon={icon} color={color}>
              {vehicleData?.status}
            </Tag>
          </Row>
          <Row>{vehicleData?.type}</Row>
          <Row>{vehicleData?.regimental}</Row>
          <Row>
            <Image width={100} src={vehicleData?.repair_slip} />
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};
VehicleDetail.defaultProps = {
  vehicleData: null,
  onOk: null
};
VehicleDetail.propTypes = {
  vehicleData: PropTypes.objectOf(PropTypes.string.isRequired),
  onOk: PropTypes.func
};

export default VehicleDetail;
