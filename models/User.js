const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { asyncAll, asyncGet, asyncRun } = require("./db");

export async function getUser(id) {
  const sql = "SELECT * FROM user WHERE id=$id";
  const user = await asyncGet(sql, { $id: id });
  return user;
}

export async function deleteUser(id) {
  const sql = "DELETE FROM user WHERE id=$id";
  await asyncRun(sql, { $id: id });
}

export async function getUsers() {
  const sql = "SELECT * FROM user";
  const users = await asyncAll(sql);
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
    $id,
    $username,
    $password,
    $createdDate,
    $createdBy,
    $updatedDate,
    $updatedBy
  )`;
  let createdUser = null;
  await asyncRun(sql, {
    $id: id,
    $username: user.username,
    $password: bcrypt.hashSync(user.password, 5),
    $createdDate: Date.now(),
    $createdBy: user.created_by,
    $updatedDate: Date.now(),
    $updatedBy: user.updated_by,
  });
  createdUser = await getUser(id);
  return createdUser;
}

export async function updateUser(user) {
  const sql = `UPDATE user 
  SET
    password = $password,
    updated_date = $updatedDate,
    updated_by = $updatedBy
  WHERE id = $id
  `;
  let updatedUser = null;
  await asyncRun(sql, {
    $password: bcrypt.hashSync(user.password, 5),
    $updatedDate: Date.now(),
    $updatedBy: user.updated_by,
    $id: user.id,
  });
  updatedUser = await getUser(user.id);
  return updatedUser;
}



