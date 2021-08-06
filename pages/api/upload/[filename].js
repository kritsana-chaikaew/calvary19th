const fs = require("fs");
const path = require("path");

export default async (req, res) => {
  const rootPath = process.env.ROOT_PATH;
  const { method, query: { filename } } = req;
  const imagePath = path.join(rootPath, "/data/upload", filename);

  switch (method) {
    case "GET":
      
      fs.readFile(imagePath, function(err, data) {
        res.setHeader("Content-Type", "image/jpeg");
        res.status(200).end(data);
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};