import {
  createClothes,
  getClotheses,
  updateClothes,
} from "../../../models/Clothes";

export default async function handler(req, res) {
  const { body, method } = req;
  let clotheses;

  switch (method) {
    case "GET":
      clotheses = await getClotheses();
      res.status(200).json(clotheses);
      break;
    case "POST":
      clotheses = await createClothes(body);
      if (clotheses) {
        res.status(200).json(clotheses);
      } else {
        res.status(400).json({ message: "cannot create clothes" });
      }
      break;
    case "PUT":
      clotheses = await updateClothes(body);
      if (clotheses) {
        res.status(200).json(clotheses);
      } else {
        res.status(400).json({ message: "cannot update clothes" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
