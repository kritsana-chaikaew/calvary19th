import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Modal, Image } from "antd";
import NImage from "next/image";
import { getVehicles } from "../models/Vehicle";
import Garage from "../component/Garage";
import Building from "../component/Building";
import Template from "../component/Template";
import Vehicle from "../component/Vehicle";

const Icon = <NImage layout="fill" src="/military-truck.svg" alt="icon" />;

const Index = ({ vehicles }) => {
  const minRowHeight = "6rem";
  const min2RowHeight = "12rem";
  const buildingHeight = "11rem";
  const gutter = [
    { xs: 5, sm: 16, md: 16, lg: 16 },
    { xs: 5, sm: 16, md: 16, lg: 16 },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleVehicleClick = (vehicleData) => {
    setModalData(vehicleData);
    showModal();
  };

  const vehicleList = vehicles.map((vehicle) => {
    return (
      <Vehicle
        onClick={() => handleVehicleClick(vehicle)}
        icon={Icon}
        data={vehicle}
        key={vehicle?.id}
      />
    );
  });
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
                vehicleList={vehicleList}
              />
            </Col>
            <Col span={12}>
              <Garage
                title="โรงรถล้อ ร้อย.ม.1"
                vehicleList={vehicleList}
              />
            </Col>
          </Row>
          <Row style={{ minHeight: minRowHeight }} gutter={gutter}>
            <Col span={8}>
              <Garage
                title="โรงรถสายพาน ร้อย.บก"
                vehicleList={vehicleList}
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
                vehicleList={vehicleList}
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
            vehicleList={vehicleList}
          />
        </Col>
        <Col span={8}>
          <Garage
            title="โรงรถสายพาน ร้อย.ม.1"
            vehicleList={vehicleList}
          />
        </Col>
        <Col span={8}>
          <Garage
            title="โรงรถสายพาน ร้อย.ม.2"
            vehicleList={vehicleList}
          />
        </Col>
      </Row>
      <Modal
        title="ข้อมูลยานพาหนะ"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <pre>
          ภาพ <Image width={100} src={modalData?.image} />
        </pre>
        <pre>หมายเลข {modalData?.serial_no}</pre>
        <pre>ชนิด {modalData?.type}</pre>
        <pre>สถานะ {modalData?.status}</pre>
        <pre>กองร้อย {modalData?.regimental}</pre>
        <pre>
          ใบส่งซ่อม <Image width={100} src={modalData?.repair_slip} />
        </pre>
      </Modal>
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
