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

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      const user = await getUser(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: `user ${id} not found` });
      }
      break;
    case "POST":
      res.status(200).json({ message: "not implement" });
      break;
    case "PUT":
      res.status(200).json({ message: "not implement" });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
