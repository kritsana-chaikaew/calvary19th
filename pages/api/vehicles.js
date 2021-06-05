const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');


export async function getVehicles() {
  const db = new sqlite3.Database(".db/calvary19.db");
  const asyncAll = promisify(db.all).bind(db);
  const sql = "SELECT * FROM vehicle";
  const vehicles = await asyncAll(sql, []);
  db.close();
  return vehicles;
}

export default async function handler(req, res) {
  const vehicles = await getVehicles();
  console.log(vehicles);
  res.status(200).json(vehicles);
}