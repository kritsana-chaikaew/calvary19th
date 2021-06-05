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

export async function deleteVehicle(id) {
  const db = new sqlite3.Database(".db/calvary19.db");
  const asyncRun = promisify(db.run).bind(db);
  const sql = "DELETE FROM vehicle WHERE id=?";
  await asyncRun(sql, [id]);
  db.close();
}

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const vehicle = await getVehicle(id);
  if (vehicle) {
    switch (method) {
      case "GET":
        res.status(200).json(vehicle);
        break;
      case "DELETE":
        await deleteVehicle(id);
        res.status(200).json({ message: `vehicle ${id} deleted` });
        break;
      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(404).json({ message: `vehicle ${id} not found` });
  }
}
