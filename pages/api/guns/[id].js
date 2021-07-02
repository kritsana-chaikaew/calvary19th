import { getGun, deleteGun } from "../../../models/Gun";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const gun = await getGun(id);
  if (gun) {
    switch (method) {
      case "GET":
        res.status(200).json(gun);
        break;
      case "DELETE":
        await deleteGun(id);
        res.status(200).json({ message: `gun ${id} deleted` });
        break;
      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(404).json({ message: `gun ${id} not found` });
  }
}
