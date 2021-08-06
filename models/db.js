const fs = require("fs");
const { promisify } = require("util");
const sqlite3 = require("sqlite3").verbose();
const handle = require("../utils/error");
const {
  createVehicle,
  createUser,
  createGun,
} = require("./statments");

if (!fs.existsSync("data/.db")) {
  fs.mkdirSync("data/.db");
}

fs.open("data/.db/calvary19.db", "a", () => {});

const db = new sqlite3.Database("data/.db/calvary19.db", (err) =>
  handle(err, "Connected to the database.")
);
const asyncAll = promisify(db.all).bind(db);
const asyncGet = promisify(db.get).bind(db);
const asyncRun = promisify(db.run).bind(db);

db.serialize(() => {
  db.run(createVehicle, (err) => handle(err, "Created table vehicle."));
  db.run(createUser, (err) => handle(err, "Created table user."));
  db.run(createGun, (err) => handle(err, "Created table gun."));
});

module.exports = {
  db,
  asyncAll,
  asyncGet,
  asyncRun,
};
