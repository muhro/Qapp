const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

let storage = new GridFsStorage({
  url: process.env.DB_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-qapp-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "fs",
      filename: `${Date.now()}-qapp-${file.originalname}`
    };
  }
});

let uploadFile = multer({ storage: storage }).single("file");
let uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;