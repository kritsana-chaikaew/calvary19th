const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");


export async function getUsers() {
  const db = new sqlite3.Database(".db/calvary19.db");
  const asyncAll = promisify(db.all).bind(db);
  const sql = "SELECT * FROM user";
  const users = await asyncAll(sql, []);
  db.close();
  return users;
}

export default async function handler(req, res) {
  const users = await getUsers();
  console.log(users);
  res.status(200).json(users);
}