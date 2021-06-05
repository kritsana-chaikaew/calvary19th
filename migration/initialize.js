const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');

if (!fs.existsSync(".db")) {
  fs.mkdirSync(".db");
}

fs.open(".db/calvary19.db", "w", () => {});

const db = new sqlite3.Database(".db/calvary19.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the database.");
  }
});

db.serialize(function() {
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
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Created table vehicle");
      }
    }
  );
  
  db.run(
    `INSERT INTO vehicle (
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
      '${new Date()}',
      'กฤษณะ',
      '${new Date()}',
      'กฤษณะ'
    )
    `,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Inserted mock vehicle");
      }
    }
  );
  
  db.run(
    `CREATE TABLE IF NOT EXISTS user (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      created_date TEXT NOT NULL,
      created_by TEXT NOT NULL,
      updated_date TEXT,
      updated_by TEXT
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Created table user");
      }
    }
  );

  db.run(
    `INSERT INTO user (
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
        '${new Date}',
        'กฤษณะ',
        '${new Date}',
        'กฤษณะ'
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Inserted mock user");
      }
    }
  );
}
);

db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Close the database connection.");
  }
});
