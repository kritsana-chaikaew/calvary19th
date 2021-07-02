import { createGun, getGuns, updateGun } from "../../../models/Gun";

export default async function handler(req, res) {
  const { body, method } = req;
  let guns;

  switch (method) {
    case "GET":
      guns = await getGuns();
      res.status(200).json(guns);
      break;
    case "POST":
      guns = await createGun(body);
      if (guns) {
        res.status(200).json(guns);
      } else {
        res.status(400).json({ message: "cannot create gun" });
      }
      break;
    case "PUT":
      guns = await updateGun(body);
      if (guns) {
        res.status(200).json(guns);
      } else {
        res.status(400).json({ message: "cannot update gun" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
