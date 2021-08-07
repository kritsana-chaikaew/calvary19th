// eslint-disable-next-line import/no-extraneous-dependencies
const csv = require("csv-parser");
const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require("node-fetch");

const url = "http://localhost:3000/api/vehicles";

function ingress() {
  fs.createReadStream("data/vehicle/vehicle-data.csv")
    .pipe(
      csv([
        "id",
        "type",
        "status",
        "regimental",
        "serial_no",
        "repair_slip",
        "image",
        "created_date",
        "created_by",
        "updated_date",
        "updated_by",
        "garage",
        "symptom",
        "row",
        "col",
      ])
    )
    .on("data", async (row) => {
      console.log(row);
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

ingress();
