const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const createVehicle = `CREATE TABLE IF NOT EXISTS vehicle (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  regimental TEXT,
  serial_no TEXT,
  created_date TEXT NOT NULL,
  created_by TEXT NOT NULL,
  updated_date TEXT,
  updated_by TEXT
)`;

const insertVehicle = `INSERT INTO vehicle (
  id,
  type,
  status,
  regimental,
  serial_no,
  created_date,
  created_by,
  updated_date,
  updated_by
) VALUES (
'${uuidv4()}',
'รถถัง',
'พร้อมใช้',
'ร้อย.ม.๒',
'๑๒๓๔',
'${Date.now()}',
'กฤษณะ',
'${Date.now()}',
'กฤษณะ'
)`;

const createUser = `CREATE TABLE IF NOT EXISTS user (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  created_date TEXT NOT NULL,
  created_by TEXT NOT NULL,
  updated_date TEXT,
  updated_by TEXT
)`;

const insertUser = `INSERT INTO user (
  id,
  username,
  password,
  created_date,
  created_by,
  updated_date,
  updated_by ) VALUES (
    '${uuidv4()}',
    'กฤษณะ',
    '${bcrypt.hashSync("1234", 5)}',
    '${Date.now()}',
    'กฤษณะ',
    '${Date.now()}',
    'กฤษณะ'
)`;

module.exports = {
  createVehicle,
  createUser,
  insertVehicle,
  insertUser,
};
