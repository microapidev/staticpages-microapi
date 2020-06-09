const File = require("./../models/file.model");
const response = require("./../utils/response");
const CustomError = require("./../utils/CustomError");
const fs = require("fs");
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
  // Add file
  async createFile(req, res) {
    // Add file path to request body
    if (req.file) req.body["fileURL"] = req.file.path;

    let file = new File(req.body);
    file.save();

    res.status(201).json(response("File created", file, true));
  }

  // Get one file
  async getFile(req, res) {
    await File.findOne({ _id: req.params.fileId }, (err, file) => {
      if (err) throw new CustomError("Error occured while retriving files");

      if (!file)
        return res.status(404).json(response("File Not Found", null, false));

      res.status(200).json(response("File Found", file, true));
    });
  }

  //route handler to get all files
  async getFiles(req, res) {
    let files = await File.find({});

    if (!files)
      return res.status(200).json(response("No Files Found", files, true));

    return res.status(200).json(response("All Files Found", files, true));
  }

  async deleteFile(req, res) {
    await File.findOne({ _id: req.params.fileId }, (err, file) => {
      const filename = file.fileURL.split("uploads/")[1];
      fs.unlink(`uploads/${filename}`, async () => {
        await File.deleteOne({ _id: req.params.id }, (err, file) => {
          if (err) throw new CustomError("Error occured while deleting file");
          if (!file)
            return res
              .status(404)
              .json(response("File Not Found", null, false));

          res.status(200).json(response("File Deleted", null, true));
        });
      });
    });
  }

  async updateFile(req, res) {
    // Add file path to request body
    if (req.file) req.body["fileURL"] = req.file.path;

    await File.findOne({ _id: req.params.fileId }, (err, file) => {
      const filename = file.fileURL.split("uploads/")[1];
      fs.unlink(`uploads/${filename}`, async () => {
        await File.findOneAndUpdate(
          {
            _id: req.params.fileId,
          },
          req.body,
          { new: true },
          (err, file) => {
            if (err) throw new CustomError("Error: File could not be updated");

            if (!file)
              return res
                .status(404)
                .json(response("File with ID not found", null, false));

            res
              .status(200)
              .json(response("File updated successfully", file, true));
          }
        );
      });
      if (err) throw new CustomError("Error occured while retriving files");

      if (!file)
        return res.status(404).json(response("File Not Found", null, false));
    });
  }
}

module.exports = new FileContoller();
