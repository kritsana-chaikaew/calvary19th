import { IncomingForm } from "formidable";
import { promises as fs } from "fs";

const path = require("path");

const upload = async (req) => {
  const { files } = await new Promise((resolve, reject) => {
    const form = new IncomingForm({ keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      return resolve({ fields, files });
    });
  });
  const tempPath = files.file.path;
  const fileName = path.basename(tempPath);
  const urlPath = path.join("/uploads", fileName.toLocaleLowerCase());
  const destinationPath = path.join("./public", urlPath);
  fs.rename(tempPath, destinationPath, (err) => {
    if (err) console.log(err);
    return {
      name: "",
      status: "error",
      url: "",
      thumbUrl: "",
    };
  });
  return {
    name: fileName,
    status: "done",
    url: urlPath,
    thumbUrl: urlPath,
  };
};

export default async (req, res) => {
  const { method } = req;
  let data;

  switch (method) {
    case "POST":
      data = await upload(req);
      res.status(200).json(data);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
