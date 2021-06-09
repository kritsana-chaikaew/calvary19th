import React from "react";
import { Modal, Image } from "antd";
import PropTypes from "prop-types";
import { statuses } from "../utils/const";

const VehicleDetail = ({ vehicleData, ...rest }) => {
  return (
    <Modal {...rest}>
      <pre>
        ภาพ <Image width={100} src={vehicleData?.image} />
      </pre>
      <pre>หมายเลข {vehicleData?.serial_no}</pre>
      <pre>ชนิด {vehicleData?.type}</pre>
      <pre>สถานะ {vehicleData?.status}</pre>
      <pre>กองร้อย {vehicleData?.regimental}</pre>
      {vehicleData?.status === statuses[1] && (
        <pre>
          ใบส่งซ่อม <Image width={100} src={vehicleData?.repair_slip} />
        </pre>
      )}
    </Modal>
  );
};
VehicleDetail.defaultProps = {
  vehicleData: null,
};
VehicleDetail.propTypes = {
  vehicleData: PropTypes.objectOf(PropTypes.string.isRequired),
};

export default VehicleDetail;
