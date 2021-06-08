import React from "react";
import { useRouter } from "next/router";
import { Card } from "antd";
import styled from "styled-components";
import PropTypes from "prop-types";
import Vehicle from "./Vehicle";
import TruckIcon from "../assets/military-truck.svg";

const CardWrapper = styled(Card)`
  width: 100%;
  height: 6rem;
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

const Garage = ({ vehicles, title, ...rest }) => {
  const router = useRouter();
  const vehicleList = vehicles.map(vehicle => {
    return (
      <Vehicle
        onClick={() => router.push(`/vehicles/${vehicle?.id}`)}
        icon={<TruckIcon />}
        data={vehicle}
        key={vehicle?.id}
      />
    );
  });
  return (
    <CardWrapper title={title} {...rest}>
      <div className="container" style={{overflowX: "scroll", paddingBottom: "15px"}}>
        <div className="scroller" style={{width: "max-content", padding: "0px 2px"}}>
          {vehicleList}
        </div>
      </div>
    </CardWrapper>
  );
};
Garage.defaultProps = {
  vehicles: [],
  title: ""
};

Garage.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string
};

export default Garage;
