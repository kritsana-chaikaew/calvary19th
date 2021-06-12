import React from "react";
import PropTypes from "prop-types";
import Building from "./Building";

const Garage = ({garage, onClick, ...rest}) => {
  return (
    <Building name={garage.name} onClick={() => onClick(garage)} {...rest} />
  );
};
Garage.defaultProps = {
  garage: null,
  onClick: null
};
Garage.propTypes = {
  garage: PropTypes.objectOf(PropTypes.any),
  onClick: PropTypes.func
};

export default Garage;