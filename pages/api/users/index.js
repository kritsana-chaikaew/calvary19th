import { createUser, getUsers, updateUser } from "../../../models/User";

export default async function handler(req, res) {
  const { body, method } = req;
  let users;

  switch (method) {
    case "GET":
      users = await getUsers();
      res.status(200).json(users);
      break;
    case "POST":
      users = await createUser(body);
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(400).json({ message: "cannot create user" });
      }
      break;
    case "PUT":
      users = await updateUser(body);
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(400).json({ message: "cannot update user" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
