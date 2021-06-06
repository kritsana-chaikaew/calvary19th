import { getVehicle } from "./[id]";

const { v4: uuidv4 } = require("uuid");
const { asyncAll, asyncRun } = require("../../../utils/db");

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

export default async function handler(req, res) {
  const { body, method } = req;
  let vehicles;

  switch (method) {
    case "GET":
      vehicles = await getVehicles();
      res.status(200).json(vehicles);
      break;
    case "POST":
      vehicles = await createVehicle(body);
      if (vehicles) {
        res.status(200).json(vehicles);
      } else {
        res.status(400).json({ message: "cannot create vehicle" });
      }
      break;
    case "PUT":
      vehicles = await updateVehicle(body);
      if (vehicles) {
        res.status(200).json(vehicles);
      } else {
        res.status(400).json({ message: "cannot update vehicle" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
