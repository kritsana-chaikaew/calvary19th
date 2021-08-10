import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import styled from "styled-components";
import Template from "../component/Template";
import Building from "../component/Common/Building";
import RegimentalModal from "../component/Common/RegimentalModal";
import { garages, gunTypes, regimentals, clothesTypes } from "../utils/const";

import VehicleModal from "../component/Vehicle/VehicleModal";
import Garage from "../component/Vehicle/Garage";
import GarageModal from "../component/Vehicle/GarageModal";

import ArmoryModal from "../component/Gun/ArmoryModal";
import GunGroupModal from "../component/Gun/GunGroupModal";
import GunModal from "../component/Gun/GunModal";

import ClothesWarehouseModal from "../component/Clothes/ClothesWarehouseModal";
import ClothesTypeModal from "../component/Clothes/ClothesTypeModal";

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
  const ArmoryModalCol = 5;

  const [isVehicleModalVisible, setIsVehicleModalVisible] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);
  const [isGarageModalVisible, setIsGarageModalVisible] = useState(false);
  const [selectedGarage, setSelectedGarage] = useState(garages[0]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [inUsedSlot, setInUsedSlot] = useState();
  const [tick, setTick] = useState(false);
  const [clickedRow, setClickedRow] = useState(null);
  const [clickedCol, setClickedCol] = useState(null);
  const [selectedRegimental, setSelectedRegimental] = useState("");
  const [selectedGunType, setSelectedGunType] = useState("");
  const [isRegimentalModalVisible, setIsRegimentalModalVisible] =
    useState(false);
  const [isArmoryModalVisible, setIsArmoryModalVisible] = useState(false);
  const [guns, setGuns] = useState([]);
  const [isGunShowModalVisible, setIsGunShowModalVisible] = useState(false);
  const [isGunGroupModalVisible, setIsGunGroupModalVisible] = useState(false);
  const [selectedGun, setSelectedGun] = useState();
  const [isClothesWarehouseModalVisible, setIsClothesWarehouseModalVisible] =
    useState(false);
  const [selectedClothesType, setSelectedClothesType] = useState();
  const [isClothesTypeModalVisible, setIsClothesTypeModalVisible] =
    useState(false);

  useEffect(async () => {
    const res = await fetch("/api/vehicles");
    const data = await res.json();
    setVehicles(data);
    setTick(!tick);
  }, [vehicleData, isVehicleModalVisible, isAddModalVisible]);

  useEffect(() => {
    fetch("/api/guns")
      .then((res) => res.json())
      .then((guns) => {
        setGuns(guns);
        setTick(!tick);
      });
  }, [isGunShowModalVisible]);

  const showVehicleModal = () => {
    setIsVehicleModalVisible(true);
  };

  const showGarageModal = () => {
    setIsGarageModalVisible(true);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleVehicleModalOk = () => {
    setIsVehicleModalVisible(false);
  };

  const handleGarageModalOk = () => {
    setIsGarageModalVisible(false);
  };

  const handleAddModalOk = () => {
    setIsAddModalVisible(false);
  };

  const handleVehicleClick = (data) => {
    if (data?.empty) {
      setClickedRow(data.row);
      setClickedCol(data.col);
      showAddModal();
    } else {
      setVehicleData(data);
      showVehicleModal();
    }
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

  const vehicleListInGarage = (garageName) => {
    if (!garageName) return [];
    return vehicles.filter((vehicle) => {
      return vehicle.garage === garageName;
    });
  };

  const handleBuildingClick = (regimental) => {
    setIsRegimentalModalVisible(true);
    setSelectedRegimental(regimental);
  };

  const handleRegimentalModalOk = () => {
    setIsRegimentalModalVisible(false);
  };

  const showArmoryModal = () => {
    setIsArmoryModalVisible(true);
  };

  const handleArmoryModalOk = () => {
    setIsArmoryModalVisible(false);
  };

  const showGunShowModal = (gun, isNull = false) => {
    setIsGunShowModalVisible(true);
    setSelectedGun({
      ...gun,
      type: selectedGunType,
      regimental: selectedRegimental,
      isNull,
    });
  };

  const showGunGroupModalVisible = (gunType) => {
    setSelectedGunType(gunType);
    setIsGunGroupModalVisible(true);
  };

  const handleGunShowModalOk = () => {
    setIsGunShowModalVisible(false);
  };

  const handleGunGroupModalOk = () => {
    setIsGunGroupModalVisible(false);
  };

  const handleClothesWarehouseModalOk = () => {
    setIsClothesWarehouseModalVisible(false);
  };

  const showClothesWarehouseModal = () => {
    setIsClothesWarehouseModalVisible(true);
  };

  const handleClothesTypeModalOk = () => {
    setIsClothesTypeModalVisible(false);
  };

  const showClothesTypeModal = (typeName) => {
    setSelectedClothesType(typeName);
    setIsClothesTypeModalVisible(true);
  };

  return (
    <Template onAddClick={handleAddClick}>
      <RowWrapper
        gap={gap}
        style={{ minHeight: minRowWrapperHeight }}
        gutter={gutter}
      >
        <Col span={8}>
          {/* โรงรถสายพาน ร้อย.ม.2 */}
          <Garage garage={garages[4]} onClick={handleGarageClick} />
        </Col>
        <Col span={8}>
          {/* โรงรถสายพาน ร้อย.ม.1 */}
          <Garage garage={garages[3]} onClick={handleGarageClick} />
        </Col>
        <Col span={8}>
          {/* โรงรถสายพาน ร้อย.ม.3 */}
          <Garage garage={garages[6]} onClick={handleGarageClick} />
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
              <Building
                name="ร้อย.ม.2"
                onClick={() => handleBuildingClick(regimentals[2])}
              />
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
              <Garage garage={garages[5]} onClick={handleGarageClick} />
            </Col>
          </RowWrapper>
          <RowWrapper
            gap={gap}
            style={{ minHeight: minRowWrapperHeight }}
            gutter={gutter}
          >
            <Col span={12}>
              <Building
                name="คลังอาภรณ์ภัณฑ์"
                onClick={showClothesWarehouseModal}
              />
            </Col>
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
              <Building
                name="ร้อย.ม.3"
                onClick={() => handleBuildingClick(regimentals[3])}
              />
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
              <Building
                name="ร้อย.ม.1"
                onClick={() => handleBuildingClick(regimentals[1])}
              />
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
              <Building
                name="ร้อย.บก."
                onClick={() => handleBuildingClick(regimentals[0])}
              />
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
        visible={isVehicleModalVisible}
        onOk={handleVehicleModalOk}
        onCancel={handleVehicleModalOk}
        vehicleData={vehicleData}
        inUsedSlot={inUsedSlot}
        selectedGarageName={selectedGarage?.name || ""}
      />
      <VehicleModal
        title="เพิ่มข้อมูล"
        edit
        visible={isAddModalVisible}
        onOk={handleAddModalOk}
        onCancel={handleAddModalOk}
        vehicleData={{}}
        inUsedSlot={inUsedSlot}
        selectedGarageName={selectedGarage?.name || ""}
        clickedRow={clickedRow}
        clickedCol={clickedCol}
      />
      <GarageModal
        garage={selectedGarage}
        visible={isGarageModalVisible}
        onCancel={handleGarageModalOk}
        centered
        vehicles={vehicleListInGarage(selectedGarage?.name)}
        onVehicleClick={handleVehicleClick}
        onGarageOpen={onGarageOpen}
        isModalVisible={isVehicleModalVisible}
        isAddModalVisible={isAddModalVisible}
        tick={tick}
      />
      <RegimentalModal
        regimental={selectedRegimental}
        visible={isRegimentalModalVisible}
        tick={tick}
        onCancel={handleRegimentalModalOk}
        centered
      >
        <div>
          <RowWrapper gutter={gutter} style={{ marginBottom: "20px" }}>
            <Col span={6}>
              <Building name="บก.ร้อย." />
            </Col>
            <Col span={12}>
              <Building name="โรงนอน" />
            </Col>
            <Col span={6}>
              <Building name="คลังอาวุธ" onClick={showArmoryModal} />
            </Col>
          </RowWrapper>
        </div>
      </RegimentalModal>
      <ArmoryModal
        regimental={selectedRegimental}
        visible={isArmoryModalVisible}
        tick={tick}
        onCancel={handleArmoryModalOk}
        centered
      >
        <div>
          <RowWrapper
            gutter={gutter}
            style={{ marginBottom: "16px", flexFlow: "wrap" }}
            justify="center"
          >
            {gunTypes.map((gunType) => {
              return (
                <Col span={ArmoryModalCol} key={gunType.name}>
                  <Building
                    name={gunType.name}
                    onClick={() => {
                      showGunGroupModalVisible(gunType.name);
                    }}
                    style={{ height: "100px" }}
                  />
                </Col>
              );
            })}
          </RowWrapper>
        </div>
      </ArmoryModal>
      {/* show gun detail */}
      <GunGroupModal
        guns={guns.filter((gun) => {
          return (
            gun.regimental === selectedRegimental &&
            gun.type === selectedGunType
          );
        })}
        onGunClick={showGunShowModal}
        onCancel={handleGunGroupModalOk}
        title={selectedGunType}
        visible={isGunGroupModalVisible}
        tick={tick}
      />
      <GunModal
        gun={selectedGun}
        onCancel={handleGunShowModalOk}
        onOk={handleGunShowModalOk}
        edit={selectedGun?.isNull}
        visible={isGunShowModalVisible}
      />
      <ClothesWarehouseModal
        visible={isClothesWarehouseModalVisible}
        tick={tick}
        onCancel={handleClothesWarehouseModalOk}
        centered
      >
        <div>
          <RowWrapper
            gutter={gutter}
            style={{ marginBottom: "16px", flexFlow: "wrap" }}
            justify="center"
          >
            {clothesTypes.map((clothesType) => {
              return (
                <Col span={ArmoryModalCol} key={clothesType.name}>
                  <Building
                    name={clothesType.name}
                    onClick={() => {
                      showClothesTypeModal(clothesType.name);
                    }}
                    style={{ height: "100px" }}
                  />
                </Col>
              );
            })}
          </RowWrapper>
        </div>
      </ClothesWarehouseModal>
      <ClothesTypeModal
        clothesType={selectedClothesType}
        onCancel={handleClothesTypeModalOk}
        title={selectedClothesType}
        visible={isClothesTypeModalVisible}
        tick={tick}
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
