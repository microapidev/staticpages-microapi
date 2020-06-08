const File = require("../models/file.model");
const response = require("../utils/response");
const CustomError = require("../utils/CustomError");

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
      if (err)
        return res
          .json({ message: "there is an error in retrieving the file" })
          .status(400);
      res
        .json({
          data: info,
          message: "The file is successfully retrieved",
        })
        .status(200);
    });
  }

  //route hancler to get all files
  getFiles(req, res) {
    let files = Files.find();
    files.then((result) => {
      res.status(200).json({
        status: true,
        message: "Files Found",
        data: result,
      });
    });
  }

  async deleteFile(req, res) {
    await File.deleteOne({ _id: req.params.id }).then(() => {
      res.status(200).json({
        status: true,
        message: "File Deleted",
      });
    });
  }
}

module.exports = new FileContoller();
