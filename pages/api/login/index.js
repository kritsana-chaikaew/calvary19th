import { getUserByUserName } from "../../../models/User";

const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { body, method } = req;
  let tokenObject = null;

  switch (method) {
    case "POST":
      tokenObject = await login(body);
      if (tokenObject) {
        res.status(200).json(tokenObject);
      } else {
        res.status(401).end("Unauthorized");
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const login = async (loginData) => {
  const user = await getUserByUserName(loginData.username);
  if (user && user.password === loginData.password) {
    return {
      accessToken: jwt.sign({ username: user.username }, "PRIVATE_KEY"),
    };
  }
  return null;
};
