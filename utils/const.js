const statuses = ["พร้อมใช้งาน", "ไม่พร้อมใช้งาน", "ชะงักใช้งาน"];
const regimentals = ["ร้อย.บก", "ร้อย.ม.1", "ร้อย.ม.2", "ร้อย.ม.3"];
const types = [
  { name: "ถ.เบา 21 FV.101", icon: "/tank.svg" },
  { name: "รสพ. M.113 A 1", icon: "/carrier.svg" },
  { name: "รสพ.ติดตั้ง ค.4.2 นิ้ว M.106 A 2", icon: "/armed-carrier.svg" },
];
const garages = [
  "โรงรถล้อ ร้อย.บก",
  "โรงรถสายพาน ร้อย.บก",
  "โรงรถล้อ ร้อย.ม.1",
  "โรงรถสายพาน ร้อย.ม.1",
  "โรงรถล้อ ร้อย.ม.2",
  "โรงรถสายพาน ร้อย.ม.2",
  "โรงรถล้อ ร้อย.ม.3",
  "โรงรถสายพาน ร้อย.ม.3",
];

module.exports = {
  statuses,
  regimentals,
  types,
  garages
};
