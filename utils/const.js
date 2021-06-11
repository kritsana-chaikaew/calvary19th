const statuses = ["ใช้การได้", "ใช้การไม่ได้", "ชะงักใช้การ"];
const regimentals = ["ร้อย.บก", "ร้อย.ม.1", "ร้อย.ม.2", "ร้อย.ม.3"];
const types = [
  { name: "รยบ. 1/4 ตัน M151A1", icon: "/jeep.svg" },
  { name: "รยบ. 1/4 ตัน M151A2", icon: "/jeep.svg" },
  { name: "รยบ. 1 1/4 ตัน M1026A1", icon: "/jeep.svg" },
  { name: "รยบ. 1 1/4 ตัน M1038A1", icon: "/jeep.svg" },
  { name: "รยบ. 1 1/4 ตัน UNIMOG", icon: "/jeep.svg" },
  { name: "รยบ. 1 1/4 ตัน TATA", icon: "/jeep.svg" },
  { name: "รยบ. 2 1/2 ตัน M35A2 WO/W (ไม่มีกว้าน)", icon: "/truck.svg" },
  { name: "รยบ. 2 1/2 ตัน M35A2 W/W (มีกว้าน)", icon: "/truck.svg" },
  { name: "รยบ. 2 1/2 ตัน ISUZU (FTS)", icon: "/truck.svg" },
  { name: "ถ.เบา 21", icon: "/tank.svg" },
  { name: "รสพ. M113A1", icon: "/carrier.svg" },
  { name: "รสพ. M106A2", icon: "/carrier.svg" },
  { name: "รยบ. 1/4 ตัน M50B", icon: "/jeep.svg" },
  { name: "รยบ. 1/4 ตัน M51A (Mitsubishi)", icon: "/jeep.svg" },
];
const garages = [
  { name: "โรงรถล้อ ร้อย.บก", regimental: regimentals[0] },
  { name: "โรงรถสายพาน ร้อย.บก", regimental: regimentals[0] },
  { name: "โรงรถล้อ ร้อย.ม.1", regimental: regimentals[1] },
  { name: "โรงรถสายพาน ร้อย.ม.1", regimental: regimentals[1] },
  { name: "โรงรถล้อ ร้อย.ม.2", regimental: regimentals[2] },
  { name: "โรงรถสายพาน ร้อย.ม.2", regimental: regimentals[2] },
  { name: "โรงรถล้อ ร้อย.ม.3", regimental: regimentals[3] },
  { name: "โรงรถสายพาน ร้อย.ม.3", regimental: regimentals[3] },
];

module.exports = {
  statuses,
  regimentals,
  types,
  garages,
};
