const File = require("../models/file.model");
const response = require("../utils/response")
const CustomError = require("../utils/CustomError")

/**
 * Controllers for :
 *
 * getFiles
 * getFile,
 * createFile,
 * updateFile,
 * deleteFile
 */

class FileContoller {
  async getFile(req, res) {
    await File.findOne({ _id: req.params.fileId }, (err, file) => {
      if (err) throw new CustomError("Error occured while retriving files");

      if (!file) return res.status(404).json(response("File Not Found", null, false))

      res.status(200).json(response("All Files Found", file, true))
    })
  }

  //route handler to get all files
  async getFiles(req, res) {
    let files = await File.find();

    if (!files) return res.status(200).json(response("No Files Found", files, true))

    return res.status(200).json(response("All Files Found", files, true))
  }

  deleteFile(req, res) {
    File.deleteOne({ _id: req.params.fileId })
      .then(() => {
        res.status(200).json({
          status: true,
          message: "File Deleted",
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: error,
        });
      });
  }
}

module.exports = new FileContoller();
