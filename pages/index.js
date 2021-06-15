import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import styled from "styled-components";
import Building from "../component/Building";
import Template from "../component/Template";
import VehicleModal from "../component/VehicleModal";
import { garages } from "../utils/const";
import Garage from "../component/Garage";
import GarageModal from "../component/GarageModal";

const RowWrapper = styled(Row)`
  padding-top: ${(props) => props.gap || 0}rem;
`;

const Index = () => {
  const minRowWrapperHeight = "6rem";
  const min2RowWrapperHeight = "12rem";
  const gutter = [
    { xs: 5, sm: 16, md: 16, lg: 16 },
    { xs: 5, sm: 16, md: 16, lg: 16 },
  ];
  const gap = 1;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [isGarageModalVisible, setIsGarageModalVisible] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState(garages[0]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [inUsedSlot, setInUsedSlot] = useState();

  useEffect(async () => {
    const res = await fetch("/api/vehicles");
    const data = await res.json();
    setVehicles(data);
  }, [vehicleData, isModalVisible, isAddModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showGarageModal = () => {
    setIsGarageModalVisible(true);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleGarageModalOk = () => {
    setIsGarageModalVisible(false);
  };

  const handleAddModalOk = () => {
    setIsAddModalVisible(false);
  };

  const handleVehicleClick = (data) => {
    setVehicleData(data);
    showModal();
  };

  const handleGarageClick = (garage) => {
    setSelectedGarage(garage);
    showGarageModal();
  };

  const handleAddClick = () => {
    showAddModal();
  };

  const onGarageOpen = (slot) => {
    setInUsedSlot(slot);
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
    <Template onAddClick={handleAddClick}>
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
        edit={false}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        vehicleData={vehicleData}
        inUsedSlot={inUsedSlot}
      />
      <VehicleModal
        title="เพิ่มข้อมูล"
        edit
        visible={isAddModalVisible}
        onOk={handleAddModalOk}
        onCancel={handleAddModalOk}
        vehicleData={{}}
        inUsedSlot={inUsedSlot}
      />
      <GarageModal
        garage={selectedGarage}
        visible={isGarageModalVisible}
        onCancel={handleGarageModalOk}
        centered
        vehicles={vehicleListInGarage[selectedGarage.name]}
        onVehicleClick={handleVehicleClick}
        onGarageOpen={onGarageOpen}
        isModalVisible={isModalVisible}
        isAddModalVisible={isAddModalVisible}
      />
    </Template>
  );
};

Index.defaultProps = {
  vehicles: [],
};

Index.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.object),
};

export default Index;
