import {
  getVehicles,
} from "../../../models/Vehicle";
import {
  getGuns
} from "../../../models/Gun";
import {
  getClotheses
} from "../../../models/Clothes";

const json2xls = require("json2xls");

export default async function handler(req, res) {
  const {
    query: { db },
    method,
  } = req;
  let data = [];
  await getVehicles();
  switch (db) {
    case "vehicle":
      data = getVehicles();
      break;
    case "gun":
      data = getGuns();
      break;
    case "clothes":
      data = getClotheses();
      break;
    default:
      break;
  }

  const xls = json2xls(data);
  const ts = Math.floor(Date.now() / 1000).toString();
  const fileBuffer = Buffer.from(xls, "binary");
  switch (method) {
    case "GET":
      res.setHeader("content-disposition", `attachment; filename=${db}_${ts}.xlsx`);
      res.send(fileBuffer);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
