const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

export async function getVehicle(id) {
  if (!id) {
    return null;
  }
  const db = new sqlite3.Database(".db/calvary19.db");
  const asyncGet = promisify(db.get).bind(db);
  const sql = "SELECT * FROM vehicle WHERE id=?";
  const vehicle = await asyncGet(sql, [id]);
  db.close();
  return vehicle;
}

export default async function handler(req, res) {
  const { query: { id }, method } = req || null;

  switch (method) {
    case "GET":
      const vehicle = await getVehicle(id);
      if (vehicle) {
        res.status(200).json(vehicle);
      } else {
        res.status(404).json({ message: `vehicle ${id} not found` });
      }
      break;
    case "DELETE":
      res.status(200).json({ message: "not implement" });
      break;
    default:
      res.setHeader('Allow', ["GET", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}