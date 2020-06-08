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
    const { fileId } = req.params;
    const fileInfo = await File.findOne({ id }, (err, info) => {
      if (err) return res.json({ message: 'there is an error in retrieving the file' }).status(400);
      res.json({
        data: info,
        message: 'The file is successfully retrieved'
      }).status(200);
    })
  }

  //route hancler to get all files
  async getFiles(req, res) {
    let files = await File.find();

    if(!files) return res.json(response("No Files Found", files, true))

    return res.json(response("All Files Found", files, true))
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
