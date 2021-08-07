// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require("node-fetch");

const { createReadStream } = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const csv = require("csv-parser");
const { gunTypes } = require("../utils/const");

const url = "http://localhost:3000/api/guns";

function ingress(type) {
  createReadStream(`data/gun/${type.name}.csv`)
    .pipe(
      csv([
        "serial_no",
        "scope",
        "regimental",
        "type",
        "repair_slip",
        "symptom",
      ])
    )
    .on("data", async (row) => {
      console.log(row.serial_no);
      const data = JSON.stringify({ ...row, status: "ใช้การได้" });
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((res) => {
          if (res.ok) {
            console.log("ok");
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
}

gunTypes.map((type) => {
  ingress(type);
  return null;
});
