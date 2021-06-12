import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import { statuses } from "../utils/const";

const ButtomWrapper = styled(Button)`
  background-color: #d6d6d6;
  width: var(--unit-size);
  height: var(--unit-size);
  padding: 0px 0px;
  margin: 1px;
  div.disable > div > img {
    filter: opacity(0.5) grayscale(1);
  }
  div.unavailable > div > img {
    filter: hue-rotate(270deg) saturate(400%);
  }
  :hover {
    transform: scale(1.01);
  }
  .icon > div:hover {
    border: solid #364239;
  }
`;

const Vehicle = ({ icon, data, ...rest }) => {
  let className = "icon available";
  if (data?.status === statuses[2]) className = "icon disable";
  if (data?.status === statuses[1]) className = "icon unavailable";
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
  icon: PropTypes.element,
  data: PropTypes.objectOf(PropTypes.any),
};

export default Vehicle;
