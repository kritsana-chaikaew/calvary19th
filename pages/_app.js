import React from "react";
import PropTypes from "prop-types";

import "antd/dist/antd.css";

const MyApp = ({ Component, pageProps }) => {
  const getTemplate = Component.getTemplate || ((page) => page);
  return getTemplate(
    <div>
      <style global jsx>
        {`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
          }
          html {
            font-size: 17px;
          }
        `}
      </style>
      <Component {...pageProps} />
    </div>
  );
};

MyApp.defaultProps = {
  Component: null,
  props: null,
  pageProps: null,
};

MyApp.propTypes = {
  Component: PropTypes.func,
  props: PropTypes.objectOf(PropTypes.string.isRequired),
  pageProps: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default MyApp;
