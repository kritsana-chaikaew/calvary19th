const fs = require("fs");
const { promisify } = require("util");
const sqlite3 = require("sqlite3").verbose();
const handle = require("../utils/error");

if (!fs.existsSync(".db")) {
  fs.mkdirSync(".db");
}

fs.open(".db/calvary19.db", "a", () => { });
const db = new sqlite3.Database(".db/calvary19.db", (err) =>
  handle(err, "Connected to the database.")
);
const asyncAll = promisify(db.all).bind(db);
const asyncGet = promisify(db.get).bind(db);
const asyncRun = promisify(db.run).bind(db);

module.exports = {
  db,
  asyncAll,
  asyncGet,
  asyncRun,
};
