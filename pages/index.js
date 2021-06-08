import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Modal, Image } from "antd";
import { getVehicles } from "../models/Vehicle";
import Garage from "../component/Garage";
import Building from "../component/Building";
import Template from "../component/Template";

const minRowHeight = "6rem";
const min2RowHeight = "12rem";
const buildingHeight = "11rem";

const Index = ({ vehicles }) => {
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

  const handleGarageClick = (vehicleData) => {
    setModalData(vehicleData);
    showModal();
  };
  return (
    <div>
      <Row style={{ minHeight: minRowHeight }} gutter={[32, 4]}>
        <Col span={8} />
        <Col span={8}>
          <Building title="บก.พัน" />
        </Col>
        <Col span={8} />
      </Row>

      <Row style={{ minHeight: min2RowHeight }} gutter={[32, 4]}>
        <Col span={4}>
          <Row style={{ minHeight: min2RowHeight }} gutter={[32, 4]}>
            <Col span={24}>
              <Building style={{ height: buildingHeight }} title="ร้อย.บก." />
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <Row style={{ minHeight: minRowHeight }} gutter={[32, 4]}>
            <Col span={12}>
              <Garage
                onClick={handleGarageClick}
                title="โรงรถล้อ ร้อย.บก"
                vehicles={vehicles}
              />
            </Col>
            <Col span={12}>
              <Garage
                onClick={handleGarageClick}
                title="โรงรถล้อ ร้อย.ม.1"
                vehicles={vehicles}
              />
            </Col>
          </Row>
          <Row style={{ minHeight: minRowHeight }} gutter={[32, 4]}>
            <Col span={8}>
              <Garage
                onClick={handleGarageClick}
                title="โรงรถสายพาน ร้อย.บก"
                vehicles={vehicles}
              />
            </Col>
            <Col span={16} />
          </Row>
        </Col>
        <Col span={4}>
          <Row style={{ minHeight: min2RowHeight }} gutter={[32, 4]}>
            <Col span={24}>
              <Building style={{ height: buildingHeight }} title="ร้อย.ม.1" />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ minHeight: min2RowHeight }} gutter={[32, 4]}>
        <Col span={4}>
          <Row style={{ minHeight: min2RowHeight }} gutter={[32, 4]}>
            <Col span={24}>
              <Building style={{ height: buildingHeight }} title="ร้อย.ม.3" />
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <Row style={{ minHeight: minRowHeight }} gutter={[32, 4]}>
            <Col span={12} />
            <Col span={12} />
          </Row>
          <Row style={{ minHeight: minRowHeight }} gutter={[32, 4]}>
            <Col span={12}>
              <Garage
                onClick={handleGarageClick}
                title="โรงรถล้อ ร้อย.ม.3"
                vehicles={vehicles}
              />
            </Col>
            <Col span={12} />
          </Row>
        </Col>
        <Col span={4}>
          <Row style={{ minHeight: min2RowHeight }} gutter={[32, 4]}>
            <Col span={24}>
              <Building style={{ height: buildingHeight }} title="ร้อย.ม.2" />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ minHeight: minRowHeight }} gutter={[32, 4]}>
        <Col span={8}>
          <Garage
            onClick={handleGarageClick}
            title="โรงรถสายพาน ร้อย.ม.3"
            vehicles={vehicles}
          />
        </Col>
        <Col span={8}>
          <Garage
            onClick={handleGarageClick}
            title="โรงรถสายพาน ร้อย.ม.1"
            vehicles={vehicles}
          />
        </Col>
        <Col span={8}>
          <Garage
            onClick={handleGarageClick}
            title="โรงรถสายพาน ร้อย.ม.2"
            vehicles={vehicles}
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
