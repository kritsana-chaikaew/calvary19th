const handle = require("../utils/error");
const { db } = require("../utils/db");

const {
  createVehicle,
  createUser,
  insertVehicle,
  insertUser,
} = require("./statments");

db.serialize(() => {
  db.run(createVehicle, (err) => handle(err, "Created table vehicle."));
  db.run(insertVehicle, (err) => handle(err, "Inserted mock vehicle."));
  db.run(createUser, (err) => handle(err, "Created table user."));
  db.run(insertUser, (err) => handle(err, "Inserted mock user."));
});
db.close((err) => handle(err, "Close the database connection."));
