import React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { List, Row, Col } from "antd";
import Vehicle from "../../component/Vehicle";
import TruckIcon from "../../assets/military-truck.svg";
import { getVehicles } from "../../models/Vehicle";

import "antd/dist/antd.css";

const Index = ({ vehicles }) => {
  const router = useRouter();

  return (
    <Row>
      <Col span={24}>
        <List
          dataSource={vehicles}
          renderItem={(vehicle) => (
            <Vehicle
              onClick={() => router.push(`/vehicles/${vehicle?.id}`)}
              icon={<TruckIcon />}
              data={vehicle}
            />
          )}
          grid={{
            gutter: [0, 24],
            column: 3,
          }}
        />
      </Col>
    </Row>
  );
};
Index.defaultProps = {
  vehicles: [],
};

Index.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.object),
};

export default Index;

export async function getStaticProps() {
  const vehicles = await getVehicles();
  return {
    props: {
      vehicles,
    },
  };
}
