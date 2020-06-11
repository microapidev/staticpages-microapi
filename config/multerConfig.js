const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop()
    let filename = `${new Date().getTime()}.${fileExt}`;
    cb(null, filename);
  },
});

module.exports = multer({
  storage: storage,
}).single("file");
