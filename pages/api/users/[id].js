const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

export async function getUser(id) {
  const db = new sqlite3.Database(".db/calvary19.db");
  const asyncGet = promisify(db.get).bind(db);
  const sql = "SELECT * FROM user WHERE id=?";
  const user = await asyncGet(sql, [id]);
  db.close();
  return user;
}

export default async function handler({ query: { id } }, res) {
  const user = await getUser(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({message: `user ${id} not found`});
  }
}