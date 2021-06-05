import { getUser } from "./[id]";


const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { db, asyncAll, asyncRun } = require("../../../utils/db");

export async function getUsers() {
  const sql = "SELECT * FROM user";
  const users = await asyncAll(sql, []);
  db.close();
  return users;
}

export async function createUser(user) {
  const id = uuidv4();
  const sql = `INSERT INTO user (
    id,
    username,
    password,
    created_date,
    created_by,
    updated_date,
    updated_by
  ) VALUES (
    '${id}',
    '${user.username}',
    '${bcrypt.hashSync(user.password, 5)}',
    '${new Date()}',
    '${user.created_by}',
    '${new Date()}',
    '${user.updated_by}'
  )`;
  let createdUser = null;
  await asyncRun(sql);
  createdUser = await getUser(id);
  db.close();
  return createdUser;
}

export default async function handler(req, res) {
  const { body, method } = req;
  let users;

  switch (method) {
    case "GET":
      users = await getUsers();
      res.status(200).json(users);
      break;
    case "POST":
      users = await createUser(body);
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(400).json({ message: "cannot create user" });
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
