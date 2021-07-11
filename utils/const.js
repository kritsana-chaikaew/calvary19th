// const statuses = ["ใช้การได้", "ใช้การไม่ได้", "ชะงักใช้การ"];
const statuses = ["ใช้การได้", "ใช้การไม่ได้"];
const regimentals = ["ร้อย.บก", "ร้อย.ม.1", "ร้อย.ม.2", "ร้อย.ม.3"];

const types = [
  { name: "ถ.เบา 21 FV.101", icon: "/tank.svg" },
  { name: "รสพ. M.113 A.2", icon: "/carrier.svg" },
  { name: "รสพ. M.113 A.1", icon: "/carrier.svg" },
  { name: "รถสายพานกู้ซ่อม M.113 A.3", icon: "/carrier.svg" },
  { name: "รถสายพานกู้ซ่อม M.578", icon: "/carrier.svg" },
  { name: "รถสายพานบังคับการ M.577 A.1", icon: "/carrier.svg" },
  { name: "รถสายพานบังคับการ M.577 A.3", icon: "/carrier.svg" },
  { name: "รถสายพานติดตั้ง ค.4.2 นิ้ว M.106 A.2", icon: "/armed-carrier.svg" },
  { name: "รถสายพานติดตั้ง ค.81 มม. M.125 A.1", icon: "/armed-carrier.svg" },
  { name: "รถสายพานติดตั้ง ค.81 มม. M.125 A.2", icon: "/armed-carrier.svg" },
  { name: "รยบ. 1 1/4 ตัน M.1026 A.1 (ฮัมวี่)", icon: "/humvee.svg" },
  { name: "รยบ. 1 1/4 ตัน M.1038 A.1 ", icon: "/humvee.svg" },
  { name: "รยบ. 1 1/4 ตัน UNIMOG W/W ( มีกว้าน )", icon: "/humvee.svg" },
  { name: "รยบ. 1 1/4 ตัน UNIMOG WO/W (ไม่มีกว้าน)", icon: "/humvee.svg" },
  { name: "รยบ. 1/4 ตัน M.151 A.1", icon: "/humvee.svg" },
  { name: "รยบ. 1/4 ตัน M.151 A.2", icon: "/humvee.svg" },
  { name: "รยบ. 1/4 ตัน พยาบาล M.718 A.1", icon: "/humvee.svg" },
  { name: "รยบ. 2 1/2 ตัน ISUZU FTS 4X4", icon: "/humvee.svg" },
  { name: "รยบ. 2 1/2 ตัน KM.250 (KIA MOTOR)", icon: "/humvee.svg" },
  { name: "รยบ. 2 1/2 ตัน M.35 A 2 W/W (มีกว้าน)", icon: "/humvee.svg" },
  { name: "รยบ. 2 1/2 ตัน M.35 A 2 WO/W (ไม่มีกว้าน)", icon: "/humvee.svg" },
  { name: "TATA แบบ LPTA 715 4X4", icon: "/humvee.svg" },
  { name: "รยบ. บรรทุกน้ำมัน 12,000 ลิตร ", icon: "/humvee.svg" },
  {
    name: "รยบ.ขนาด 3/4 ตัน แบบ M.37 B.1 (สำหรับใช้เชิญธงชัยเฉลิมพล)",
    icon: "/humvee.svg",
  },
  { name: "รยบ.ขนาดเบา 4X4 แบบ 50 (ฉบับปรับปรุงใหม่)", icon: "/humvee.svg" },
  { name: "รยบ.ขนาดเบา 4X4 แบบ 51 (ฉบับปรับปรุงใหม่)", icon: "/humvee.svg" },
  {
    name: "รยบ.ขนาดเบา 4X4 แบบ 51 A (บังคับการและติดตั้งป้อมปืนกล)",
    icon: "/humvee.svg",
  },
  { name: "รถกู้ 5 ตัน M.543 A.2", icon: "/humvee.svg" },
  { name: "รถกู้ ถ.เบา 21 FV.106 (แซมซั่น)", icon: "/tank.svg" },
  { name: "รถพ่วง 1 1/2 ตัน สัมภาระ M.105 A.2 C", icon: "/humvee.svg" },
  { name: "รถพ่วง 1 1/4 ตัน บรรทุกน้ำ 400 แกลลอน M.149", icon: "/humvee.svg" },
  { name: "รถพ่วง 1/4 ตัน บรรทุกน้ำ 250 แกลลอน", icon: "/humvee.svg" },
  { name: "รถพ่วง 1/4 ตัน สัมภาระ M.416", icon: "/humvee.svg" },
  { name: "รถพ่วง 3/4 ตัน สัมภาระ M.101 A.1", icon: "/humvee.svg" },
];

const garages = [
  { name: "โรงรถล้อ ร้อย.บก", regimental: regimentals[0], row: 2, col: 25 },
  { name: "โรงรถสายพาน ร้อย.บก", regimental: regimentals[0], row: 2, col: 6 },
  { name: "โรงรถล้อ ร้อย.ม.1", regimental: regimentals[1], row: 2, col: 24 },
  { name: "โรงรถสายพาน ร้อย.ม.1", regimental: regimentals[1], row: 2, col: 8 },
  // { name: "โรงรถล้อ ร้อย.ม.2", regimental: regimentals[2], row: 2, col: 25 },
  { name: "โรงรถสายพาน ร้อย.ม.2", regimental: regimentals[2], row: 2, col: 8 },
  { name: "โรงรถล้อ ร้อย.ม.3", regimental: regimentals[3], row: 2, col: 25 },
  { name: "โรงรถสายพาน ร้อย.ม.3", regimental: regimentals[3], row: 2, col: 6 },
];

const gunTypes = [
  { name: "TAR 21", image: "" },
  { name: "เครื่องยิง", image: "" },
  { name: "M.4", image: "" },
  { name: "M.17", image: "" },
  { name: "เครื่องยิงพลุ", image: "" },
  { name: "M.16", image: "" },
  { name: "Mag 58", image: "" },
  { name: "L.43 A 1", image: "" },
  { name: "M.240", image: "" },
  { name: "ปพ.86", image: "" },
  { name: "ปก.93", image: "" },
  { name: "ปถ.", image: "" },
  { name: "กล้องและขาหยั่ง", image: "" },
];

module.exports = {
  statuses,
  regimentals,
  types,
  garages,
  gunTypes,
};
