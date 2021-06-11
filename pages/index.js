import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Modal, Button } from "antd";
import Image from "next/image";
import styled from "styled-components";
import { getVehicles } from "../models/Vehicle";
import Building from "../component/Building";
import Template from "../component/Template";
import Vehicle from "../component/Vehicle";
import VehicleDetail from "../component/VehicleDetail";
import { types, garages } from "../utils/const";
import device from "../utils/device";
import Garage from "../component/Garage";

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

const ModalWrapper = styled(Modal)`
  width: 70vw !important;
  min-height: 50vh;
  .ant-modal-content {
    height: 100%;
    width: 100%;
    display: flex !important;
    flex-flow: column nowrap;
  }
  .ant-modal-body {
    overflow: scroll;
    height: 300px;
  }
  .ant-modal-title {
    font-size: 1.5rem;
  }
  @media ${device.xs} {
    .ant-modal-body {
      text-align: center;
    }
  }
  @media ${device.md} {
    .ant-modal-body {
      text-align: unset;
    }
  }
  .container {
    height: 100%;
  }
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
  const [selectedGarageName, setSelectedGarageName] = useState();
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
  const handleGarageClick = (garageName) => {
    setSelectedGarageName(garageName);
    showGarageModal();
  };
  const getVehicleComponentList = (vehicleList) => {
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
  
  const vehicleListInGarage = garages.reduce((o, garage) => {
        return {
          ...o,
          [garage.name]: vehicles.filter((vehicle) => {
            return vehicle.garage === garage.name;
          }),
        };
    },
    {}
  );

  return (
    <div>
      <RowWrapper gap={gap} style={{ minHeight: minRowWrapperHeight }} gutter={gutter}>
        <Col span={8}>
          {/* โรงรถสายพาน ร้อย.ม.2 */}
          <Garage
            name={garages[5].name}
            onClick={handleGarageClick}
          />
        </Col>
        <Col span={8}>
          {/* โรงรถสายพาน ร้อย.ม.1 */}
          <Garage
            name={garages[3].name}
            onClick={handleGarageClick}
          />
        </Col>
        <Col span={8}>
          {/* โรงรถสายพาน ร้อย.ม.3 */}
          <Garage
            name={garages[7].name}
            onClick={handleGarageClick}
          />
        </Col>
      </RowWrapper>
      
      <RowWrapper style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
        <Col span={4}>
          <RowWrapper gap={gap} style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
            <Col span={24}>
              <Building name="ร้อย.ม.2" />
            </Col>
          </RowWrapper>
        </Col>
        <Col span={16}>
          <RowWrapper gap={gap} style={{ minHeight: minRowWrapperHeight }} gutter={gutter}>
            <Col span={12} />
            <Col span={12}>
              <Garage
                name={garages[6].name}
                onClick={handleGarageClick}
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
              <Building name="ร้อย.ม.3" />
            </Col>
          </RowWrapper>
        </Col>
      </RowWrapper>

      <RowWrapper style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
        <Col span={4}>
          <RowWrapper gap={gap} style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
            <Col span={24}>
              <Building name="ร้อย.ม.1" />
            </Col>
          </RowWrapper>
        </Col>
        <Col span={16}>
          <RowWrapper gap={gap} style={{ minHeight: minRowWrapperHeight }} gutter={gutter}>
            <Col span={16} />
            <Col span={8}>
              <Garage 
                name={garages[1].name}
                onClick={handleGarageClick}
              />
            </Col>
          </RowWrapper>
          <RowWrapper gap={gap} style={{ minHeight: minRowWrapperHeight }} gutter={gutter}>
            <Col span={12}>
              <Garage
                name={garages[2].name}
                onClick={handleGarageClick}
              />
            </Col>
            <Col span={12}>
              <Garage
                name={garages[0].name}
                onClick={handleGarageClick}
              />
            </Col>
          </RowWrapper>
        </Col>
        <Col span={4}>
          <RowWrapper gap={gap} style={{ minHeight: min2RowWrapperHeight }} gutter={gutter}>
            <Col span={24}>
              <Building name="ร้อย.บก." />
            </Col>
          </RowWrapper>
        </Col>
      </RowWrapper>
      
      <RowWrapper gap={gap} style={{ minHeight: minRowWrapperHeight }} gutter={gutter}>
        <Col span={8} />
        <Col span={8}>
          <Building name="บก.พัน" />
        </Col>
        <Col span={8} />
      </RowWrapper>
      
      <VehicleDetail
        title="ข้อมูลยานพาหนะ"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        vehicleData={vehicleData}
      />
      <ModalWrapper 
        title={selectedGarageName}
        visible={isGarageModalVisible}
        onCancel={handleGarageModalOk}
        okText="ปิด"
        centered
        footer={[
          <Button key="ok" onClick={handleGarageModalOk} type="primary" size="large">
            ปิด
          </Button>,
        ]}
      >
        <div className="container">
          {selectedGarageName? getVehicleComponentList(vehicleListInGarage[selectedGarageName]): ""}
        </div>
      </ModalWrapper>
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