import React, { useState, useEffect } from "react";
import { Button } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import { statuses } from "../../utils/const";

const ButtonWrapper = styled(Button)`
  width: var(--gun-size);
  height: var(--gun-size);
  padding: 0px 0px;
  margin: 1px;
  background-color: #22bb33;
  .gun-icon {
    width: 100%;
    heigh: 100%;
  }
`;

const Icon = ({ serialNo, label }) => (
  <div className="gun-icon">{label || serialNo?.slice(-4)}</div>
);
Icon.defaultProps = {
  serialNo: null,
  label: null,
};
Icon.propTypes = {
  serialNo: PropTypes.string,
  label: PropTypes.string,
};

const Gun = ({ data, label, ...rest }) => {
  const [className, setClassName] = useState();
  useEffect(() => {
    if (data?.status === statuses[1] || label) {
      setClassName("unavailable");
    }
  }, [data]);

  return (
    <ButtonWrapper type="text" className={className} {...rest}>
      <div>
        <Icon serialNo={data?.serial_no} label={label} />
      </div>
    </ButtonWrapper>
  );
};

Gun.defaultProps = {
  icon: null,
  data: null,
  label: null,
};

Gun.propTypes = {
  icon: PropTypes.element,
  data: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
};

export default Gun;
