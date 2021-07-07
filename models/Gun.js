const { v4: uuidv4 } = require("uuid");
const { asyncAll, asyncGet, asyncRun } = require("./db");
const { insertGun, updateGunStmt } = require("./statments");

export async function getGun(id) {
  if (!id) {
    return null;
  }
  const sql = "SELECT * FROM gun WHERE id=$id";
  const gun = await asyncGet(sql, { $id: id });
  return gun;
}

export async function deleteGun(id) {
  const sql = "DELETE FROM gun WHERE id=$id";
  await asyncRun(sql, { $id: id });
}

export async function getGuns() {
  const sql = "SELECT * FROM gun";
  const guns = await asyncAll(sql);
  return guns;
}

export async function createGun(gun) {
  const id = uuidv4();
  let createdGun = null;
  await asyncRun(insertGun, {
    $id: id,
    $type: gun.type,
    $status: gun.status,
    $regimental: gun.regimental,
    $serialNo: gun.serial_no,
    $repairSlip: gun.repair_slip,
    $symptom: gun.symptom,
    $scope: gun.scope,
  });
  createdGun = await getGun(id);
  return createdGun;
}

export async function updateGun(gun) {
  let updatedGun = null;
  await asyncRun(updateGunStmt, {
    $id: gun.id,
    $type: gun.type,
    $status: gun.status,
    $regimental: gun.regimental,
    $serialNo: gun.serial_no,
    $repairSlip: gun.repair_slip,
    $symptom: gun.symptom,
    $scope: gun.scope,
  });
  updatedGun = await getGun(gun.id);
  return updatedGun;
}
