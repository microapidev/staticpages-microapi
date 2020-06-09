const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");
    let filename = `${new Date().getTime()}${name}`;
    cb(null, filename);
  },
});

module.exports = multer({
  storage: storage,
}).single("file");
