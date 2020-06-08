const express = require('express');
const {
  getFiles,
  getFile,
  createFile,
  updateFile,
  deleteFile
} = require('../controllers/files');

const router = express.Router();


router.post("/", createFile);
router.get("/", getFiles);
router.get("/:fileId", getFile);
router.put("/:fileId", updateFile);
router.delete("/:fileId", deleteFile);


module.exports = router;
