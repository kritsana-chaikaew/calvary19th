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
    $repairSlip: vehicle.repair_slip,
    $image: vehicle.image,
    $createdDate: Date.now(),
    $createdBy: vehicle.created_by,
    $updatedDate: Date.now(),
    $updatedBy: vehicle.updated_by,
    $garage: vehicle.garage,
    $symptom: vehicle.symptom,
    $row: vehicle.row,
    $col: vehicle.col,
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
    $repairSlip: vehicle.repair_slip,
    $image: vehicle.image,
    $createdDate: Date.now(),
    $createdBy: vehicle.created_by,
    $updatedDate: Date.now(),
    $updatedBy: vehicle.created_by,
    $garage: vehicle.garage,
    $symptom: vehicle.symptom,
    $row: vehicle.row,
    $col: vehicle.col,
  });
  updatedVehicle = await getVehicle(vehicle.id);
  return updatedVehicle;
}

export async function getAllVehicleIds() {
  const sql = "SELECT id FROM vehicle";
  const items = await asyncAll(sql);
  const allIds = items.map((item) => {
    return {
      params: {
        id: item.id,
      },
    };
  });
  return allIds;
}
