import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";

const CardWrapper = styled(Card)`
  width: 100%;
  height: 5rem;
  padding: 2px 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  div[class^="ant-card"] {
    padding: 0px 0px;
    min-height: 1rem;
  }
  .ant-card-body {
    height: 4rem;
    overflow: hidden;
  }
`;

const Garage = ({ vehicleList, title, ...rest }) => {
  
  return (
    <CardWrapper title={title} {...rest}>
      <div
        className="container"
        style={{ overflowX: "scroll", paddingBottom: "15px" }}
      >
        <div
          className="scroller"
          style={{ width: "max-content", padding: "0px 2px" }}
        >
          {vehicleList}
        </div>
      </div>
    </CardWrapper>
  );
};
Garage.defaultProps = {
  vehicles: [],
  title: "",
  vehicleList: []
};

Garage.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  vehicleList: PropTypes.arrayOf(PropTypes.object)
};

export default Garage;
