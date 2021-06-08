const createVehicle = `CREATE TABLE IF NOT EXISTS vehicle (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  regimental TEXT,
  serial_no TEXT,
  repair_slip TEXT,
  image TEXT,
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
  repair_slip,
  image,
  created_date,
  created_by,
  updated_date,
  updated_by ) VALUES (
  $id,
  $type,
  $status,
  $regimental,
  $serialNo,
  $repairSlip,
  $image,
  $createdDate,
  $createdBy,
  $updatedDate,
  $updatedBy
)`;

const updateVehicleStmt = `UPDATE vehicle 
  SET
    type = $type,
    status = $status,
    regimental = $regimental,
    serial_no = $serialNo,
    repair_slip = $repairSlip,
    image = $image,
    updated_date = $updatedDate,
    updated_by = $updatedBy
  WHERE id = $id
`;

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
  $id,
  $username,
  $password,
  $createdDate,
  $createdBy,
  $updatedDate,
  $updatedBy
)`;

const updateUserStmt = `UPDATE user 
SET
  password = $password,
  updated_date = $updatedDate,
  updated_by = $updatedBy
WHERE id = $id
`;

module.exports = {
  createVehicle,
  insertVehicle,
  updateVehicleStmt,
  createUser,
  insertUser,
  updateUserStmt,
};