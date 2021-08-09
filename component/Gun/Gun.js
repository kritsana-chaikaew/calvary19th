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
  .unavailable {
    background-color: #bb2233 !important;;
  }
  .gun-icon {
    width: 100%;
    heigh: 100%;
  }
`;

const Icon = ({ serialNo }) => <div className="gun-icon">{serialNo.slice(-4)}</div>;
Icon.propTypes = {
  serialNo: PropTypes.string.isRequired,
};

const Gun = ({ data, ...rest }) => {
  const [className, setClassName] = useState();
  useEffect(() => {
    if (data?.status === statuses[1]) {
      setClassName("unavailable");
    }
  }, [data]);

  return (
    <ButtonWrapper type="text" className={className} {...rest}>
      <div>
        <Icon serialNo={data.serial_no} />
      </div>
    </ButtonWrapper>
  );
};

Gun.defaultProps = {
  icon: null,
  data: null,
};

Gun.propTypes = {
  icon: PropTypes.element,
  data: PropTypes.objectOf(PropTypes.any),
};

export default Gun;
