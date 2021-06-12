import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import styled from "styled-components";
import { getVehicles } from "../models/Vehicle";
import Building from "../component/Building";
import Template from "../component/Template";
import VehicleModal from "../component/VehicleModal";
import { garages } from "../utils/const";
import Garage from "../component/Garage";
import GarageModal from "../component/GarageModal";

const RowWrapper = styled(Row)`
  padding-top: ${(props) => props.gap || 0}rem;
`;

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
  const [isGarageModalVisible, setIsGarageModalVisible] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState(garages[0]);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const showGarageModal = () => {
    setIsGarageModalVisible(true);
  };
  const handleModalOk = () => {
    setIsModalVisible(false);
  };
  const handleGarageModalOk = () => {
    setIsGarageModalVisible(false);
  };
  const handleVehicleClick = (data) => {
    setVehicleData(data);
    showModal();
  };
  const handleGarageClick = (garage) => {
    setSelectedGarage(garage);
    showGarageModal();
  };

  const vehicleListInGarage = garages.reduce((o, garage) => {
    return {
      ...o,
      [garage.name]: vehicles.filter((vehicle) => {
        return vehicle.garage === garage.name;
      }),
    };
  }, {});

  return (
    <div>
      <RowWrapper
        gap={gap}
        style={{ minHeight: minRowWrapperHeight }}
        gutter={gutter}
      >
        <Col span={8}>
          {/* โรงรถสายพาน ร้อย.ม.2 */}
          <Garage garage={garages[5]} onClick={handleGarageClick} />
        </Col>
        <Col span={8}>
          {/* โรงรถสายพาน ร้อย.ม.1 */}
          <Garage garage={garages[3]} onClick={handleGarageClick} />
        </Col>
        <Col span={8}>
          {/* โรงรถสายพาน ร้อย.ม.3 */}
          <Garage garage={garages[7]} onClick={handleGarageClick} />
        </Col>
      </RowWrapper>

      <RowWrapper style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
        <Col span={4}>
          <RowWrapper
            gap={gap}
            style={{ minHeight: min2RowWrapperHeight }}
            gutter={gutter}
          >
            <Col span={24}>
              <Building name="ร้อย.ม.2" />
            </Col>
          </RowWrapper>
        </Col>
        <Col span={16}>
          <RowWrapper
            gap={gap}
            style={{ minHeight: minRowWrapperHeight }}
            gutter={gutter}
          >
            <Col span={12} />
            <Col span={12}>
              {/* โรงรถล้อ ร้อย.ม.3 */}
              <Garage garage={garages[6]} onClick={handleGarageClick} />
            </Col>
          </RowWrapper>
          <RowWrapper
            gap={gap}
            style={{ minHeight: minRowWrapperHeight }}
            gutter={gutter}
          >
            <Col span={12} />
            <Col span={12} />
          </RowWrapper>
        </Col>
        <Col span={4}>
          <RowWrapper
            gap={gap}
            style={{ minHeight: min2RowWrapperHeight }}
            gutter={gutter}
          >
            <Col span={24}>
              <Building name="ร้อย.ม.3" />
            </Col>
          </RowWrapper>
        </Col>
      </RowWrapper>

      <RowWrapper style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
        <Col span={4}>
          <RowWrapper
            gap={gap}
            style={{ minHeight: min2RowWrapperHeight }}
            gutter={gutter}
          >
            <Col span={24}>
              <Building name="ร้อย.ม.1" />
            </Col>
          </RowWrapper>
        </Col>
        <Col span={16}>
          <RowWrapper
            gap={gap}
            style={{ minHeight: minRowWrapperHeight }}
            gutter={gutter}
          >
            <Col span={16} />
            <Col span={8}>
              {/* โรงรถสายพาน ร้อย.บก */}
              <Garage garage={garages[1]} onClick={handleGarageClick} />
            </Col>
          </RowWrapper>
          <RowWrapper
            gap={gap}
            style={{ minHeight: minRowWrapperHeight }}
            gutter={gutter}
          >
            <Col span={12}>
              {/* โรงรถล้อ ร้อย.ม.1 */}
              <Garage garage={garages[2]} onClick={handleGarageClick} />
            </Col>
            <Col span={12}>
              {/* โรงรถล้อ ร้อย.บก */}
              <Garage garage={garages[0]} onClick={handleGarageClick} />
            </Col>
          </RowWrapper>
        </Col>
        <Col span={4}>
          <RowWrapper
            gap={gap}
            style={{ minHeight: min2RowWrapperHeight }}
            gutter={gutter}
          >
            <Col span={24}>
              <Building name="ร้อย.บก." />
            </Col>
          </RowWrapper>
        </Col>
      </RowWrapper>

      <RowWrapper
        gap={gap}
        style={{ minHeight: minRowWrapperHeight }}
        gutter={gutter}
      >
        <Col span={8} />
        <Col span={8}>
          <Building name="บก.พัน" />
        </Col>
        <Col span={8} />
      </RowWrapper>

      <VehicleModal
        title="ข้อมูลยานพาหนะ"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        vehicleData={vehicleData}
      />
      <GarageModal
        garage={selectedGarage}
        visible={isGarageModalVisible}
        onCancel={handleGarageModalOk}
        okText="ปิด"
        centered
        vehicles={vehicleListInGarage[selectedGarage.name]}
        onVehicleClick={handleVehicleClick}
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
