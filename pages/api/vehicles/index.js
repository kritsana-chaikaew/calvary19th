import { getVehicle } from "./[id]";

const { v4: uuidv4 } = require("uuid");
const { db, asyncAll, asyncRun } = require("../../../utils/db");

export async function getVehicles() {
  const sql = "SELECT * FROM vehicle";
  const vehicles = await asyncAll(sql, []);
  db.close();
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
    '${id}',
    '${vehicle.type}',
    '${vehicle.status}',
    '${vehicle.regimental}',
    '${vehicle.serial_no}',
    '${new Date()}',
    '${vehicle.created_by}',
    '${new Date()}',
    '${vehicle.updated_by}'
  )`;
  let createdVehicle = null;
  await asyncRun(sql);
  createdVehicle = await getVehicle(id);
  db.close();
  return createdVehicle;
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
      res.status(200).json({ message: "not implement" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
