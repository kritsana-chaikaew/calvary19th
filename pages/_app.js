import React from "react";
import PropTypes from "prop-types";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <Component {...pageProps} />
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}
      </style>
    </div>
  );
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
