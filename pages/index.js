import React, { useCallback, useEffect, useState } from "react";
import { Card, List } from "antd";

import "antd/dist/antd.css";

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
    <List
      dataSource={vehicles}
      renderItem={(item) => (
        <Card title={item?.serial_no} bordered style={{ width: 300 }}>
          <p>{item?.type}</p>
          <p>{item?.status}</p>
          <p>{item?.regimental}</p>
        </Card>
      )}
    />
  );
};

export default Home;
