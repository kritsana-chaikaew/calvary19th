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
  updated_by TEXT,
  garage TEXT,
  symptom TEXT,
  row INTEGER,
  col INTEGER
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
  updated_by,
  garage,
  symptom,
  row,
  col
) VALUES (
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
  $updatedBy,
  $garage,
  $symptom,
  $row,
  $col
)`;

const updateVehicleStmt = `UPDATE vehicle 
  SET
    type = $type,
    status = $status,
    regimental = $regimental,
    serial_no = $serialNo,
    repair_slip = $repairSlip,
    image = $image,
    created_date = $createdDate,
    created_by = $createdBy,
    updated_date = $updatedDate,
    updated_by = $updatedBy,
    garage = $garage,
    symptom = $symptom,
    row = $row,
    col = $col
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

const createGun = `CREATE TABLE IF NOT EXISTS gun (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  regimental TEXT,
  serial_no TEXT,
  repair_slip TEXT,
  symptom TEXT,
  scope TEXT
)`;

const insertGun = `INSERT INTO gun (
  id,
  type,
  status,
  regimental,
  serial_no,
  repair_slip,
  symptom,
  scope
) VALUES (
  $id,
  $type,
  $status,
  $regimental,
  $serialNo,
  $repairSlip,
  $symptom,
  $scope
)`;

const updateGunStmt = `UPDATE gun 
  SET
    type = $type,
    status = $status,
    regimental = $regimental,
    serial_no = $serialNo,
    repair_slip = $repairSlip,
    symptom = $symptom,
    scope= $scop
  WHERE id = $id
`;

const createClothes = `CREATE TABLE IF NOT EXISTS clothes (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  no TEXT,
  list TEXT,
  count INTEGER,
  spend INTEGER,
  lack INTEGER,
  exeed INTEGER,
  remain INTEGER,
  receive INTEGER,
  remark TEXT
)`;

const insertClothes = `INSERT INTO clothes (
  id,
  type,
  no,
  list,
  count,
  spend,
  lack,
  exeed,
  remain,
  receive,
  remark
) VALUES (
  $id,
  $type,
  $no,
  $list,
  $count,
  $spend,
  $lack,
  $exeed,
  $remain,
  $receive,
  $remark
)`;

const updateClothesStmt = `UPDATE clothes 
  SET
    type = $type,
    no = $no,
    list = $list,
    count = $count,
    spend = $spend,
    lack = $lack,
    exeed = $exeed,
    remain = $remain,
    receive = $receive,
    remark = $remark
  WHERE id = $id
`;

module.exports = {
  createVehicle,
  insertVehicle,
  updateVehicleStmt,
  createUser,
  insertUser,
  updateUserStmt,
  createGun,
  insertGun,
  updateGunStmt,
  createClothes,
  insertClothes,
  updateClothesStmt
};
