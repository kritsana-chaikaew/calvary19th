import {
  createVehicle,
  getVehicles,
  updateVehicle,
} from "../../../models/Vehicle";

export default async function handler(req, res) {
  const { body, method } = req;
  let vehicles;

  switch (method) {
    case "GET":
      vehicles = await getVehicles();
      res.status(200).json(vehicles);
      break;
    case "POST":
      vehicles = await createVehicle(body);
      if (vehicles) {
        res.status(200).json(vehicles);
      } else {
        res.status(400).json({ message: "cannot create vehicle" });
      }
      break;
    case "PUT":
      vehicles = await updateVehicle(body);
      if (vehicles) {
        res.status(200).json(vehicles);
      } else {
        res.status(400).json({ message: "cannot update vehicle" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
