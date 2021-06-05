const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");
const { v4: uuidv4 } = require("uuid");
import { getVehicle } from "./[id]";

export async function getVehicles() {
  const db = new sqlite3.Database(".db/calvary19.db");
  const asyncAll = promisify(db.all).bind(db);
  const sql = "SELECT * FROM vehicle";
  const vehicles = await asyncAll(sql, []);
  db.close();
  return vehicles;
}

export async function createVehicle(vehicle) {
  const db = new sqlite3.Database(".db/calvary19.db");
  const asyncRun = promisify(db.run).bind(db);
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

  switch (method) {
    case "GET":
      const vehicles = await getVehicles();
      res.status(200).json(vehicles);
      break;
    case "POST":
      const createdVehicle = await createVehicle(body);
      if (createdVehicle) {
        res.status(200).json(createdVehicle);
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
