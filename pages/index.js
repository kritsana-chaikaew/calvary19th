import React, { useCallback, useEffect, useState } from "react";
import { List } from "antd";
import Inventory from "../component/Inventory";

import "antd/dist/antd.css";
import Template from "../component/Template";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);

  const getVehicles = useCallback(() => {
    fetch("/api/vehicles").then((res) => {
      res.json().then((res) => {
        setVehicles(vehicles.concat(res));
      });
    });
  }, [vehicles]);

  useEffect(() => {
    if (vehicles.length === 0) {
      getVehicles();
    }
  });

  return (
    <Template>
      <List
        dataSource={vehicles}
        renderItem={(item) => (
          <Inventory title={item?.serial_no}>
            <p>ประเภท: {item?.type}</p>
            <p>สถานะ: {item?.status}</p>
            <p>กองร้อย: {item?.regimental}</p>
          </Inventory>
        )}
        grid={{
          gutter: [0, 24],
          column: 3,
        }}
      />
    </Template>
  );
};

export default Home;
