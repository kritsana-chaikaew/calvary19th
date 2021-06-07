import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";

import "antd/dist/antd.css";

const ButtomWrapper = styled(Button)`
  width: 10rem;
  height: 10rem;
`;

const Vehicle = ({ icon, data, ...rest }) => {
  // TODO: change icon color based on status
  // const disable = data?.status === "ชะงักใช้งาน";
  // const unavailable = data?.status === "ไม่พร้อมใช้งาน";
  return <ButtomWrapper {...rest}>{icon}</ButtomWrapper>;
};
Vehicle.defaultProps = {
  children: null,
  icon: null,
  data: null,
};

Vehicle.propTypes = {
  children: PropTypes.element,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.symbol]),
  data: PropTypes.objectOf(PropTypes.string.isRequired),
};

export default Vehicle;
