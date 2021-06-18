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
  }
  div.disable > div > img {
  }
  div.unavailable > div > img {
    filter: hue-rotate(230deg) saturate(4);
  }
  :hover {
    transform: scale(1.01);
  }
  .icon > div:hover {
    border: solid #364239;
  }
  .index {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 0.8rem;
    padding: 0;
    margin: 0;
    line-height: 0.8rem;
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

const Vehicle = ({ data, index, ...rest }) => {
  let className = "icon available";
  if (data?.status === statuses[0]) className = "icon normal";
  if (data?.status === statuses[1]) className = "icon unavailable";
  // if (data?.status === statuses[2]) className = "icon disable";
  return (
    <ButtonWrapper type="text" {...rest}>
      <div className="index">{index}</div>
      <div className={className}>{data ? Icons[data.type] : EmptyIcon}</div>
    </ButtonWrapper>
  );
};

Vehicle.defaultProps = {
  icon: null,
  data: null,
  index: null,
};

Vehicle.propTypes = {
  icon: PropTypes.element,
  data: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
};

export default Vehicle;
