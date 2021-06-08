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

const Building = ({ title, ...props }) => {
  return (
    <div className="building" {...props}>
      {title}
      <style jsx>{`
        .building {
          height: 6rem;
          width: 100%;
          text-align: center;
          border: 1px solid grey;
          background-color: #fff;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        `}
      </style>
    </div>
  );
};

const minRowHeight = "7rem";
const min2RowHeight = "14rem";
const buildingHeight = "13rem";

const Index = ({ vehicles }) => {
  return (
    <LayoutWrapper>
      <Content style={{ padding: "20px 20px" }}>
        <Row style={{minHeight: minRowHeight}} gutter={[32, 4]}>
          <Col span={8} />
          <Col span={8}><Building title="บก.พัน" /></Col>
          <Col span={8} />
        </Row>

        <Row style={{minHeight: min2RowHeight}} gutter={[32, 4]}>
          <Col span={4}>
            <Row style={{minHeight: min2RowHeight}} gutter={[32, 4]}>
              <Col span={24}><Building style={{ height: buildingHeight }} title="ร้อย.บก." /></Col>
            </Row>
          </Col>
          <Col span={16}>
            <Row style={{minHeight: minRowHeight}} gutter={[32, 4]}>
              <Col span={12}><Garage title="โรงรถล้อ ร้อย.บก" vehicles={vehicles} /></Col>
              <Col span={12}><Garage title="โรงรถล้อ ร้อย.ม.1" vehicles={vehicles} /></Col>
            </Row>
            <Row style={{minHeight: minRowHeight}} gutter={[32, 4]}>
              <Col span={8}><Garage title="โรงรถสายพาน ร้อย.บก" vehicles={vehicles} /></Col>
              <Col span={16} />
            </Row>
          </Col>
          <Col span={4}>
            <Row style={{minHeight: min2RowHeight}} gutter={[32, 4]}>
              <Col span={24}><Building style={{ height: buildingHeight }} title="ร้อย.ม.1" /></Col>
            </Row>
          </Col>
        </Row>
        
        <Row style={{minHeight: min2RowHeight}} gutter={[32, 4]}>
          <Col span={4}>
            <Row style={{minHeight: min2RowHeight}} gutter={[32, 4]}>
              <Col span={24}><Building style={{ height: buildingHeight }} title="ร้อย.ม.3" /></Col>
            </Row>
          </Col>
          <Col span={16}>
            <Row style={{minHeight: minRowHeight}} gutter={[32, 4]}>
              <Col span={12} />
              <Col span={12} />
            </Row>
            <Row style={{minHeight: minRowHeight}} gutter={[32, 4]}>
              <Col span={12}><Garage title="โรงรถล้อ ร้อย.ม.3" vehicles={vehicles} /></Col>
              <Col span={12} />
            </Row>
          </Col>
          <Col span={4}>
            <Row style={{minHeight: min2RowHeight}} gutter={[32, 4]}>
              <Col span={24}><Building style={{ height: buildingHeight }} title="ร้อย.ม.2" /></Col>
            </Row>
          </Col>
        </Row>
        
        <Row style={{minHeight: minRowHeight}} gutter={[32, 4]}>
          <Col span={8}><Garage title="โรงรถสายพาน ร้อย.ม.3" vehicles={vehicles} /></Col>
          <Col span={8}><Garage title="โรงรถสายพาน ร้อย.ม.1" vehicles={vehicles} /></Col>
          <Col span={8}><Garage title="โรงรถสายพาน ร้อย.ม.2" vehicles={vehicles} /></Col>
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
