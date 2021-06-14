const formidable = require("formidable");

const handler = async (req, res) => {
  const { method } = req;
  const form = new formidable.IncomingForm({ keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    console.log(err, fields, files);
  });
  
  switch (method) {
    case "POST":
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

export default handler;
