const { v4: uuidv4 } = require("uuid");
const { asyncAll, asyncGet, asyncRun } = require("./db");
const { insertVehicle, updateVehicleStmt } = require("./statments");

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
  let createdVehicle = null;
  await asyncRun(insertVehicle, {
    $id: id,
    $type: vehicle.type,
    $status: vehicle.status,
    $regimental: vehicle.regimental,
    $serialNo: vehicle.serial_no,
    $repaireSlip: vehicle.repair_slip,
    $image: vehicle.image,
    $createdDate: Date.now(),
    $createdBy: vehicle.created_by,
    $updatedDate: Date.now(),
    $updatedBy: vehicle.updated_by,
  });
  createdVehicle = await getVehicle(id);
  return createdVehicle;
}

export async function updateVehicle(vehicle) {
  let updatedVehicle = null;
  await asyncRun(updateVehicleStmt, {
    $id: vehicle.id,
    $type: vehicle.type,
    $status: vehicle.status,
    $regimental: vehicle.regimental,
    $serialNo: vehicle.serial_no,
    $repaireSlip: vehicle.repair_slip,
    $image: vehicle.image,
    $updatedDate: Date.now(),
    $updatedBy: vehicle.updated_by,
  });
  updatedVehicle = await getVehicle(vehicle.id);
  return updatedVehicle;
}
