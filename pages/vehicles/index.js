import React from "react";
import PropTypes from "prop-types";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import { getVehicles } from "../../models/Vehicle";
import Garage from "../../component/Garage";

const { Content } = Layout;
const LayoutWrapper = styled(Layout)`
  height: 100%;
`;

const Index = ({ vehicles }) => {
  return (
    <LayoutWrapper>
      <Content style={{ padding: "50px 50px" }}>
        <Row style={{border: "1px solid black", minHeight: "8rem"}} gutter={[8, 8]}>
          <Col span={6} />
          <Col span={12} />
          <Col span={6} />
        </Row>
        <Row style={{border: "1px solid black", minHeight: "8rem"}} gutter={[8, 8]}>
          <Col span={4} />
          <Col span={8} />
          <Col span={8} />
          <Col span={4} />
        </Row>
        <Row style={{border: "1px solid black", minHeight: "8rem"}} gutter={[8, 8]}>
          <Col span={4} />
          <Col span={6} />
          <Col span={4} />
          <Col span={6} />
          <Col span={4} />
        </Row>
        <Row style={{border: "1px solid black", minHeight: "8rem"}} gutter={[8, 8]}>
          <Col span={4} />
          <Col span={8} />
          <Col span={8} />
          <Col span={4} />
        </Row>
        <Row style={{border: "1px solid black", minHeight: "8rem"}} gutter={[8, 8]}>
          <Col span={8}><Garage title="โรงรถ ร้อย.ม.2" vehicles={vehicles} /></Col>
          <Col span={8}><Garage title="โรงรถ ร้อย.ม.2" vehicles={vehicles} /></Col>
          <Col span={8}><Garage title="โรงรถ ร้อย.ม.2" vehicles={vehicles} /></Col>
        </Row>
      </Content>
    </LayoutWrapper>
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
