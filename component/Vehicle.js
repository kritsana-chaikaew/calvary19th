import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtomWrapper = styled(Button)`
  width: 3rem;
  height: 3rem;
  padding: 0px 0px;
  div.disable > svg {
    filter: opacity(0.5) grayscale(1);
  }
  div.unavailable > svg {
    filter: hue-rotate(270deg) saturate(400%);
  }
  :hover {
    transform: scale(1.1);
  }
`;

const Vehicle = ({ icon, data, ...rest }) => {
  let className;
  if (data?.status === "ชะงักใช้งาน") className = "disable";
  if (data?.status === "ไม่พร้อมใช้งาน") className = "unavailable";
  return (
    <ButtomWrapper type="text" {...rest}>
      <div className={className}>{icon}</div>
    </ButtomWrapper>
  );
};
Vehicle.defaultProps = {
  icon: null,
  data: null,
};

Vehicle.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.symbol]),
  data: PropTypes.objectOf(PropTypes.string.isRequired),
};

export default Vehicle;
