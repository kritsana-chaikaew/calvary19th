import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import Image from "next/image";
import { getVehicles } from "../models/Vehicle";
import Garage from "../component/Garage";
import Building from "../component/Building";
import Template from "../component/Template";
import Vehicle from "../component/Vehicle";
import VehicleDetail from "../component/VehicleDetail";
import { types, regimentals } from "../utils/const";

const Icons = Object.fromEntries(
  types.map((type) => [
    type.name,
    <Image layout="fill" src={type.icon} alt={type.name} />,
  ])
);

const Index = ({ vehicles }) => {
  const minRowHeight = "6rem";
  const min2RowHeight = "12rem";
  const buildingHeight = "11rem";
  const gutter = [
    { xs: 5, sm: 16, md: 16, lg: 16 },
    { xs: 5, sm: 16, md: 16, lg: 16 },
  ];

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
      <Row style={{ minHeight: minRowHeight }} gutter={gutter}>
        <Col span={8} />
        <Col span={8}>
          <Building title="บก.พัน" />
        </Col>
        <Col span={8} />
      </Row>

      <Row style={{ minHeight: min2RowHeight }} gutter={gutter}>
        <Col span={4}>
          <Row style={{ minHeight: min2RowHeight }} gutter={gutter}>
            <Col span={24}>
              <Building style={{ height: buildingHeight }} title="ร้อย.บก." />
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <Row style={{ minHeight: minRowHeight }} gutter={gutter}>
            <Col span={12}>
              <Garage
                title="โรงรถล้อ ร้อย.บก"
                vehicleList={getVehicleList(
                  vehicleListByRegimental[regimentals[0]]
                )}
              />
            </Col>
            <Col span={12}>
              <Garage
                title="โรงรถล้อ ร้อย.ม.1"
                vehicleList={getVehicleList(
                  vehicleListByRegimental[regimentals[1]]
                )}
              />
            </Col>
          </Row>
          <Row style={{ minHeight: minRowHeight }} gutter={gutter}>
            <Col span={8}>
              <Garage
                title="โรงรถสายพาน ร้อย.บก"
                vehicleList={getVehicleList(
                  vehicleListByRegimental[regimentals[0]]
                )}
              />
            </Col>
            <Col span={16} />
          </Row>
        </Col>
        <Col span={4}>
          <Row style={{ minHeight: min2RowHeight }} gutter={gutter}>
            <Col span={24}>
              <Building style={{ height: buildingHeight }} title="ร้อย.ม.1" />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ minHeight: min2RowHeight }} gutter={gutter}>
        <Col span={4}>
          <Row style={{ minHeight: min2RowHeight }} gutter={gutter}>
            <Col span={24}>
              <Building style={{ height: buildingHeight }} title="ร้อย.ม.3" />
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <Row style={{ minHeight: minRowHeight }} gutter={gutter}>
            <Col span={12} />
            <Col span={12} />
          </Row>
          <Row style={{ minHeight: minRowHeight }} gutter={gutter}>
            <Col span={12}>
              <Garage
                title="โรงรถล้อ ร้อย.ม.3"
                vehicleList={getVehicleList(
                  vehicleListByRegimental[regimentals[3]]
                )}
              />
            </Col>
            <Col span={12} />
          </Row>
        </Col>
        <Col span={4}>
          <Row style={{ minHeight: min2RowHeight }} gutter={gutter}>
            <Col span={24}>
              <Building style={{ height: buildingHeight }} title="ร้อย.ม.2" />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ minHeight: minRowHeight }} gutter={gutter}>
        <Col span={8}>
          <Garage
            title="โรงรถสายพาน ร้อย.ม.3"
            vehicleList={getVehicleList(
              vehicleListByRegimental[regimentals[3]]
            )}
          />
        </Col>
        <Col span={8}>
          <Garage
            title="โรงรถสายพาน ร้อย.ม.1"
            vehicleList={getVehicleList(
              vehicleListByRegimental[regimentals[1]]
            )}
          />
        </Col>
        <Col span={8}>
          <Garage
            title="โรงรถสายพาน ร้อย.ม.2"
            vehicleList={getVehicleList(
              vehicleListByRegimental[regimentals[2]]
            )}
          />
        </Col>
      </Row>
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
