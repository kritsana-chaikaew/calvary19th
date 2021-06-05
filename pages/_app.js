import React from "react";
import PropTypes from "prop-types";

function MyApp({ Component, props }) {
  return <Component {...props} />;
}

MyApp.defaultProps = {
  Component: null,
  props: null,
};

MyApp.propTypes = {
  Component: PropTypes.element,
  props: PropTypes.element,
};

export default MyApp;
