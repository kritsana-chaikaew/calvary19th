import { getVehicle, deleteVehicle } from "../../../models/Vehicle";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const vehicle = await getVehicle(id);
  if (vehicle) {
    switch (method) {
      case "GET":
        res.status(200).json(vehicle);
        break;
      case "DELETE":
        await deleteVehicle(id);
        res.status(200).json({ message: `vehicle ${id} deleted` });
        break;
      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(404).json({ message: `vehicle ${id} not found` });
  }
}
