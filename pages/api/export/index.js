import {
  getVehicles,
} from "../../../models/Vehicle";

const json2xls = require("json2xls");

export default async function handler(req, res) {
  const { method } = req;
  const vehicles = await getVehicles();
  const xls = json2xls(vehicles);
  const fileBuffer = Buffer.from(xls, "binary");
  switch (method) {
    case "GET":
      res.setHeader("content-disposition", "attachment; filename=data.xlsx");
      res.send(fileBuffer);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
