import React from "react";
import PropTypes from "prop-types";

function MyApp({ Component, props }) {
  return <Component {...props} />;
}

export async function getStaticProps(context) {
  const sqlite3 = require("sqlite3").verbose();

  let db = new sqlite3.Database(".db/calvary19.db", (err) => {
    if (err) {
      console.error(err.message);
      return {
        notFound: true,
      };
    }
  });

  console.log("Connected to the database.");
  return {
    props: { db },
  };
}

MyApp.defaultProps = {
  Component: null,
  props: null,
};

MyApp.propTypes = {
  Component: PropTypes.func,
  props: PropTypes.object,
};

export default MyApp;
