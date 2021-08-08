import { getClothes, deleteClothes } from "../../../models/Clothes";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const clothes = await getClothes(id);
  if (clothes) {
    switch (method) {
      case "GET":
        res.status(200).json(clothes);
        break;
      case "DELETE":
        await deleteClothes(id);
        res.status(200).json({ message: `clothes ${id} deleted` });
        break;
      default:
        res.setHeader("Allow", ["GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(404).json({ message: `clothes ${id} not found` });
  }
}
