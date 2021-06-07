import React from "react";
import PropTypes from "prop-types";
import { getAllVehicleIds, getVehicle } from "../../models/Vehicle";

export default function Vehicle({ vehicle }) {
  return (
    <div>
      {vehicle.id}
      <br />
      {vehicle.type}
      <br />
      {vehicle.status}
    </div>
  );
}
Vehicle.defaultProps = {
  vehicle: null,
};

Vehicle.propTypes = {
  vehicle: PropTypes.object,
};

export async function getStaticPaths() {
  const paths = await getAllVehicleIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const vehicle = await getVehicle(params.id);
  return {
    props: {
      vehicle,
    },
  };
}
