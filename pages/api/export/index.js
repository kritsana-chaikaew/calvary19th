import {
  createVehicle,
  getVehicles,
  updateVehicle,
} from "../../../models/Vehicle";

const fs = require('fs')
const path = require('path')
var json2xls = require('json2xls');

export default async function handler(req, res) {
  const { body, method } = req;
  let vehicles = await getVehicles();

  switch (method) {
    case "GET":
      vehicles = await getVehicles()
      res.setHeader("content-disposition", "attachment; filename=data.xlsx");
      var xls = json2xls(vehicles);
      const filePath = path.resolve('.', 'public/data.xlsx')
      fs.writeFileSync(filePath, xls, 'binary');
      const fileBuffer = fs.readFileSync(filePath)
      res.send(fileBuffer)
      // res.status(200).json(vehicles)
      // res.status(200).json(vehicles);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
