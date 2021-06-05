const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
import { getUser } from "./[id]"

export async function getUsers() {
  const db = new sqlite3.Database(".db/calvary19.db");
  const asyncAll = promisify(db.all).bind(db);
  const sql = "SELECT * FROM user";
  const users = await asyncAll(sql, []);
  db.close();
  return users;
}

export async function createUser(user) {
  const db = new sqlite3.Database(".db/calvary19.db");
  const asyncRun = promisify(db.run).bind(db);
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
  let createdUser = null
  await asyncRun(sql);
  createdUser = await getUser(id);
  db.close();
  return createdUser;
}

export default async function handler(req, res) {
  const {
    body,
    method
  } = req;

  switch (method) {
    case "GET":
      const users = await getUsers();
      res.status(200).json(users);
      break;
    case "POST":
      const createdUser = await createUser(body);
      if (createdUser) {
        res.status(200).json(createdUser);
      } else {
        res.status(400).json({ message: 'cannot create user' });
      }
      break;
    case "PUT":
      res.status(200).json({ message: "not implement" });
      break;
    default:
      res.setHeader('Allow', ["GET", "POST", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}