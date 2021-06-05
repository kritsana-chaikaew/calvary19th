const { db, asyncGet, asyncRun } = require("../../../utils/db");

export async function getUser(id) {
  const sql = "SELECT * FROM user WHERE id=?";
  const user = await asyncGet(sql, [id]);
  db.close();
  return user;
}

export async function deleteUser(id) {
  const sql = "DELETE FROM user WHERE id=?";
  await asyncRun(sql, [id]);
  db.close();
}

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const user = await getUser(id);
  if (user) {
    switch (method) {
      case "GET":
        res.status(200).json(user);
        break;
      case "DELETE":
        await deleteUser(id);
        res.status(200).json({ message: `user ${id} deleted` });
        break;
      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(404).json({ message: `user ${id} not found` });
  }
}
