import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import Image from "next/image";
import styled from "styled-components";
import { getVehicles } from "../models/Vehicle";
import Building from "../component/Building";
import Template from "../component/Template";
import Vehicle from "../component/Vehicle";
import VehicleDetail from "../component/VehicleDetail";
import { types, regimentals } from "../utils/const";

const Icons = types.reduce(
  (o, type) => ({
    ...o,
    [type.name]: <Image layout="fill" src={type.icon} alt={type.name} />,
  }),
  {}
);

const RowWrapper = styled(Row)`
  padding-top: ${props => props.gap||0}rem;
`;

// Todo: replace old garage with improved garage
const Index = ({ vehicles }) => {
  const minRowWrapperHeight = "6rem";
  const min2RowWrapperHeight = "12rem";
  const gutter = [
    { xs: 5, sm: 16, md: 16, lg: 16 },
    { xs: 5, sm: 16, md: 16, lg: 16 },
  ];
  const gap = 1;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehicleData, setVehicleData] = useState({});
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleVehicleClick = (data) => {
    setVehicleData(data);
    showModal();
  };

  const getVehicleList = (vehicleList) => {
    return vehicleList.map((vehicle) => {
      return (
        <Vehicle
          onClick={() => handleVehicleClick(vehicle)}
          icon={Icons[vehicle.type]}
          data={vehicle}
          key={vehicle?.id}
        />
      );
    });
  };

  // TODO: vehicles should belong to Garage not only regimental
  // and should get from db
  const vehicleListByRegimental = Object.fromEntries(
    regimentals.map((regimental) => [
      regimental,
      vehicles.filter((vehicle) => {
        return vehicle.regimental === regimental;
      }),
    ])
  );

  return (
    <div>
      <RowWrapper gap={gap} style={{ minHeight: minRowWrapperHeight }} gutter={gutter}>
        <Col span={8}>
          <Building
            title="โรงรถสายพาน ร้อย.ม.3"
            items={getVehicleList(vehicleListByRegimental[regimentals[3]])}
          />
        </Col>
        <Col span={8}>
          <Building
            title="โรงรถสายพาน ร้อย.ม.1"
            items={getVehicleList(vehicleListByRegimental[regimentals[1]])}
          />
        </Col>
        <Col span={8}>
          <Building
            title="โรงรถสายพาน ร้อย.ม.2"
            items={getVehicleList(vehicleListByRegimental[regimentals[2]])}
          />
        </Col>
      </RowWrapper>
      
      <RowWrapper style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
        <Col span={4}>
          <RowWrapper gap={gap} style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
            <Col span={24}>
              <Building title="ร้อย.ม.2" />
            </Col>
          </RowWrapper>
        </Col>
        <Col span={16}>
          <RowWrapper gap={gap} style={{ minHeight: minRowWrapperHeight }} gutter={gutter}>
            <Col span={12} />
            <Col span={12}>
              <Building
                title="โรงรถล้อ ร้อย.ม.3"
                items={getVehicleList(vehicleListByRegimental[regimentals[3]])}
              />
            </Col>
          </RowWrapper>
          <RowWrapper gap={gap} style={{ minHeight: minRowWrapperHeight }} gutter={gutter}>
            <Col span={12} />
            <Col span={12} />
          </RowWrapper>
        </Col>
        <Col span={4}>
          <RowWrapper gap={gap} style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
            <Col span={24}>
              <Building title="ร้อย.ม.3" />
            </Col>
          </RowWrapper>
        </Col>
      </RowWrapper>

      <RowWrapper style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
        <Col span={4}>
          <RowWrapper gap={gap} style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
            <Col span={24}>
              <Building title="ร้อย.ม.1" />
            </Col>
          </RowWrapper>
        </Col>
        <Col span={16}>
          <RowWrapper gap={gap} style={{ minHeight: minRowWrapperHeight }} gutter={gutter}>
            <Col span={16} />
            <Col span={8}>
              <Building title="โรงรถสายพาน ร้อย.บก" />
            </Col>
          </RowWrapper>
          <RowWrapper gap={gap} style={{ minHeight: minRowWrapperHeight }} gutter={gutter}>
            <Col span={12}>
              <Building
                title="โรงรถล้อ ร้อย.ม.1"
                items={getVehicleList(vehicleListByRegimental[regimentals[1]])}
              />
            </Col>
            <Col span={12}>
              <Building
                title="โรงรถล้อ ร้อย.บก"
                items={getVehicleList(vehicleListByRegimental[regimentals[0]])}
              />
            </Col>
          </RowWrapper>
        </Col>
        <Col span={4}>
          <RowWrapper gap={gap} style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
            <Col span={24}>
              <Building title="ร้อย.บก." />
            </Col>
          </RowWrapper>
        </Col>
      </RowWrapper>
      
      <RowWrapper gap={gap} style={{ minHeight: minRowWrapperHeight }} gutter={gutter}>
        <Col span={8} />
        <Col span={8}>
          <Building title="บก.พัน" />
        </Col>
        <Col span={8} />
      </RowWrapper>
      
      <VehicleDetail
        title="ข้อมูลยานพาหนะ"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        vehicleData={vehicleData}
      />
    </div>
  );
};
Index.defaultProps = {
  vehicles: [],
};

Index.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.object),
};

Index.getTemplate = (page) => <Template>{page}</Template>;

export default Index;

export async function getStaticProps() {
  const vehicles = await getVehicles();
  return {
    props: {
      vehicles,
    },
  };
}
