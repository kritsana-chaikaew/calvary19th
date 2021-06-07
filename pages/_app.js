import React from "react";
import PropTypes from "prop-types";

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

MyApp.defaultProps = {
  Component: null,
  props: null,
  pageProps: null
};

MyApp.propTypes = {
  Component: PropTypes.func,
  props: PropTypes.objectOf(PropTypes.string.isRequired),
  pageProps: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default MyApp;
