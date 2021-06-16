import React from "react";
import { Button } from "antd";
import Image from "next/image";
import styled from "styled-components";
import PropTypes from "prop-types";
import { statuses, types } from "../utils/const";

const ButtonWrapper = styled(Button)`
  background-color: #d6d6d6;
  width: var(--unit-size);
  height: var(--unit-size);
  padding: 0px 0px;
  margin: 1px;
  div.normal > div  {
    background-color: #22bb33
  }
  div.disable > div > img {
    // filter: opacity(0.5) grayscale(1);
    background-color: #aaaaaa;
  }
  div.unavailable > div > img {
    // filter: hue-rotate(270deg) saturate(400%);
    background-color: #bb2124;
  }
  :hover {
    transform: scale(1.01);
  }
  .icon > div:hover {
    border: solid #364239;
  }
`;

const EmptyIcon = <Image layout="fill" src="/empty.svg" alt="empty" />;

const Icons = types.reduce(
  (o, type) => ({
    ...o,
    [type.name]: <Image layout="fill" src={type.icon} alt={type.name} />,
  }),
  {}
);

const Vehicle = ({ data, ...rest }) => {
  let className = "icon available";
  if (data?.status === statuses[0]) className = "icon normal";
  if (data?.status === statuses[1]) className = "icon unavailable";
  if (data?.status === statuses[2]) className = "icon disable";
  return (
    <ButtonWrapper type="text" {...rest}>
      <div className={className}>{data ? Icons[data.type] : EmptyIcon}</div>
    </ButtonWrapper>
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
