const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(".db/calvary19.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the database.");
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS vehicle (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      regimental TEXT,
      serial_no TEXT,
      created_date TEXT NOT NULL,
      created_by TEXT NOT NULL,
      updated_date TEXT,
      updated_by TEXT
  );
  CREATE TABLE IF NOT EXISTS user (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      created_date TEXT NOT NULL,
      created_by TEXT NOT NULL,
      updated_date TEXT,
      updated_by TEXT
  );`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);

db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Close the database connection.");
  }
});
