import React from "react";
import PropTypes from "prop-types";
import Building from "./Building";

const Garage = ({name, onClick, ...rest}) => {
  return (
    <Building name={name} onClick={() => onClick(name)} {...rest} />
  );
};
Garage.defaultProps = {
  name: "",
  onClick: null
};
Garage.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func
};

export default Garage;