import React from "react";
import PropTypes from "prop-types";

const MyApp = ({ Component }) => {
  return <Component />;
};

MyApp.defaultProps = {
  Component: null,
};

MyApp.propTypes = {
  Component: PropTypes.func,
};

export default MyApp;
