// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require("node-fetch");

const { createReadStream } = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const csv = require("csv-parser");
const { clothesTypes } = require("../utils/const");

const url = "http://localhost:3000/api/clothes";

function ingress(type) {
  createReadStream(`data/clothes/${type.name}.csv`)
    .pipe(
      csv([
        "no",
        "list",
        "count",
        "spend",
        "lack",
        "exeed",
        "remain",
        "receive",
        "remark",
      ])
    )
    .on("data", async (row) => {
      console.log(row.list);
      if (row.list === "list") return;
      const data = JSON.stringify({ ...row, type: type.name });
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

clothesTypes.map((type) => {
  ingress(type);
  return null;
});
