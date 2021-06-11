const { v4: uuidv4 } = require("uuid");
const handle = require("../utils/error");
const { db } = require("../models/db");
const { statuses, types, garages } = require("../utils/const");

const {
  createVehicle,
  createUser,
  insertVehicle,
  insertUser,
} = require("../models/statments");

const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const randomInt = (min, max) => {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
  );
};

const randomGarage = sample(garages);
const mockVehicle = {
  $id: uuidv4(),
  $type: sample(types.map(t => t.name)),
  $status: sample(statuses),
  $regimental: randomGarage.regimental,
  $serialNo: randomInt(10000, 20000),
  $repairSlip:
    "https://image.shutterstock.com/image-vector/example-red-square-grunge-stamp-260nw-327662909.jpg",
  $image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Is-3_lesany.jpg",
  $createdDate: Date.now(),
  $createdBy: sample(["กฤษณะ", "นิติ", "โอฬาร"]),
  $updatedDate: Date.now(),
  $updatedBy: sample(["กฤษณะ", "นิติ", "โอฬาร"]),
  $garage: randomGarage.name,
  $symptom: "อาการเสีย",
  $row: 1,
  $col: 1
};

const mockUser = {
  $id: uuidv4(),
  $username: "olan",
  $password: "1234",
  $createdDate: Date.now(),
  $createdBy: "admin",
  $updatedDate: Date.now(),
  $updatedBy: "admin",
};

db.serialize(() => {
  db.run(createVehicle, (err) => handle(err, "Created table vehicle."));
  db.run(insertVehicle, mockVehicle, (err) =>
    handle(err, "Inserted mock vehicle.")
  );
  db.run(createUser, (err) => handle(err, "Created table user."));
  db.run(insertUser, mockUser, (err) => handle(err, "Inserted mock user."));
});
db.close((err) => handle(err, "Close the database connection."));
