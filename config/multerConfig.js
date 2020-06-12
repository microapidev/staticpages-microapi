const multer = require("multer");
const File = require("./../models/file.model");
const CustomError = require("./../utils/CustomError");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: async (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    let filename = `${await getFileName(req)}.${fileExt}`;
    cb(null, filename);
  }, 
});

async function getFileName(req) {
  if (!req.user.config.titleAsName) return new Date().getTime();

  if (await File.findOne({ title: req.body.title })) {
    throw new CustomError("File title already exist");
  }

  return req.body.title.split(" ").join("-");
}

module.exports = multer({
  storage: storage,
}).single("file");
