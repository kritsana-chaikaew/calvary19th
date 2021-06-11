import React from "react";
import Image from "next/image";
import Vehicle from "./Vehicle";
import { types } from "../utils/const";

const Icons = types.reduce(
  (o, type) => ({
    ...o,
    [type.name]: <Image layout="fill" src={type.icon} alt={type.name} />,
  }),
  {}
);

const VehicleList = ({vehicles, onVehicleClick}) => {
  return vehicles.map((vehicle) => {
    return (
      <Vehicle
        onClick={() => onVehicleClick(vehicle)}
        icon={Icons[vehicle.type]}
        data={vehicle}
        key={vehicle?.id}
      />
    );
  });
};

export default VehicleList;