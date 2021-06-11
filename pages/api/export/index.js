import {
  getVehicles,
} from "../../../models/Vehicle";

const fs = require("fs");
const path = require("path");
const json2xls = require("json2xls");

export default async function handler(req, res) {
  const { method } = req;
  const vehicles = await getVehicles();
  const xls = json2xls(vehicles);
  const filePath = path.resolve(".", "public/data.xlsx");
  const fileBuffer = fs.readFileSync(filePath);
  switch (method) {
    case "GET":
      res.setHeader("content-disposition", "attachment; filename=data.xlsx");
      fs.writeFileSync(filePath, xls, "binary");
      res.send(fileBuffer);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
