
const { v4: uuidv4 } = require("uuid");
const { asyncAll, asyncGet, asyncRun } = require("./db");

export async function getVehicle(id) {
  if (!id) {
    return null;
  }
  const sql = "SELECT * FROM vehicle WHERE id=$id";
  const vehicle = await asyncGet(sql, { $id: id });
  return vehicle;
}

export async function deleteVehicle(id) {
  const sql = "DELETE FROM vehicle WHERE id=$id";
  await asyncRun(sql, { $id: id });
}

export async function getVehicles() {
  const sql = "SELECT * FROM vehicle";
  const vehicles = await asyncAll(sql);
  return vehicles;
}

export async function createVehicle(vehicle) {
  const id = uuidv4();
  const sql = `INSERT INTO vehicle (
    id,
    type,
    status,
    regimental,
    serial_no,
    created_date,
    created_by,
    updated_date,
    updated_by
  ) VALUES (
    $id,
    $type,
    $status,
    $regimental,
    $serialNo,
    $createdDate,
    $createdBy,
    $updatedDate,
    $updatedBy
  )`;
  let createdVehicle = null;
  await asyncRun(sql, {
    $id: id,
    $type: vehicle.type,
    $status: vehicle.status,
    $regimental: vehicle.regimental,
    $serialNo: vehicle.serial_no,
    $createdDate: Date.now(),
    $createdBy: vehicle.created_by,
    $updatedDate: Date.now(),
    $updatedBy: vehicle.updated_by,
  });
  createdVehicle = await getVehicle(id);
  return createdVehicle;
}

export async function updateVehicle(vehicle) {
  const sql = `UPDATE vehicle 
  SET
    type = $type,
    status = $status,
    regimental = $regimental,
    serial_no = $serialNo,
    updated_date = $updatedDate,
    updated_by = $updatedBy
  WHERE id = $id
  `;
  let updatedVehicle = null;
  await asyncRun(sql, {
    $id: vehicle.id,
    $type: vehicle.type,
    $status: vehicle.status,
    $regimental: vehicle.regimental,
    $serialNo: vehicle.serial_no,
    $updatedDate: Date.now(),
    $updatedBy: vehicle.updated_by,
  });
  updatedVehicle = await getVehicle(vehicle.id);
  return updatedVehicle;
}