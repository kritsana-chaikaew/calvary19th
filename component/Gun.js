import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import { statuses } from "../utils/const";

const ButtonWrapper = styled(Button)`
  background-color: #22bb33;
  width: var(--gun-size);
  height: var(--gun-size);
  padding: 0px 0px;
  margin: 1px;
  div.unavailable > div > div {
    filter: hue-rotate(230deg) saturate(4);
  }
  .index {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 0.6rem;
    padding: 0;
    margin: 0;
    line-height: 0.8rem;
  }
  .gun-icon {
  }
`;

const Icon = ({ serialNo }) => <div className="gun-icon">{serialNo.split(" ")[1]}</div>;
Icon.propTypes = {
  serialNo: PropTypes.string.isRequired,
};

const Gun = ({ data, ...rest }) => {
  let className = "icon available";
  if (data?.status === statuses[0]) className = "icon normal";
  if (data?.status === statuses[1]) className = "icon unavailable";
  return (
    <ButtonWrapper type="text" {...rest}>
      <div className={className}>
        <Icon serialNo={data.serial_no} />
      </div>
    </ButtonWrapper>
  );
};

Gun.defaultProps = {
  icon: null,
  data: null,
  index: null,
};

Gun.propTypes = {
  icon: PropTypes.element,
  data: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
};

export default Gun;
