import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const CardWrapper = styled(Card)`
  width: 20rem;
`;

const Inventory = (props) => {
  const { children, ...rest } = props;

  return (
    <CardWrapper {...rest} bordered>
      {children}
    </CardWrapper>
  );
};

Inventory.defaultProps = {
  children: null,
};

Inventory.propTypes = {
  children: PropTypes.element,
};

export default Inventory;
