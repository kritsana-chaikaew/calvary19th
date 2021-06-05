const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

export async function getVehicle(id) {
  const db = new sqlite3.Database(".db/calvary19.db");
  const asyncGet = promisify(db.get).bind(db);
  const sql = "SELECT * FROM vehicle WHERE id=?";
  const vehicle = await asyncGet(sql, [id]);
  db.close();
  return vehicle;
}

export default async function handler({ query: { id } }, res) {
  const vehicle = await getVehicle(id);
  if (vehicle) {
    res.status(200).json(vehicle);
  } else {
    res.status(404).json({message: `vehicle ${id} not found`});
  }
}