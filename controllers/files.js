const File = require("../models/file.model");
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
  deleteFile(req, res) {
    File.deleteOne({ _id: req.params.id })
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
