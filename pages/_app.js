import React from "react";
import PropTypes from "prop-types";

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

MyApp.defaultProps = {
  Component: null,
  props: null,
};

MyApp.propTypes = {
  Component: PropTypes.func,
  props: PropTypes.object,
};

export default MyApp;
