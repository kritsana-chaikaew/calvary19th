import React from "react";
import PropTypes from "prop-types";

function useIsClient() {
  const [isClient, setIsClient] = React.useState(false);
  // The following effect will be ignored on server, 
  // but run on the browser to set the flag true
  React.useEffect(() => setIsClient(true), []);
  return isClient;
}

const MyApp = ({ Component, pageProps }) => {
  const getLayout = 
    Component.getLayout || (page => page);
  const isClient = useIsClient();
  return (isClient && getLayout(<Component {...pageProps} />));
};

MyApp.defaultProps = {
  Component: null,
  pageProps: null,
};

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default MyApp;
