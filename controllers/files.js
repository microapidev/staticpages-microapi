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
    if (req.file.path) req.body["fileURL"] = req.file.path;
    let file = new File(req.body);
    file.save();

    res.status(201).json(response("File created", file, true));
  }

  // Get one file
  async getFile(req, res) {
    const file = await File.findOne({ _id: req.params.fileId })
    if (!file) throw new CustomError("File Not Found", 404);

    res.status(200).json(response("File Found", file, true));
  }

  //Get all files
  async getFiles(req, res) {
    const files = await File.find({});
    if (!files) res.status(200).json(response("No Files Found", files, true));

    res.status(200).json(response("All Files Found", files, true));
  }

  // Delete one file
  async deleteFile(req, res) {
    const file = await File.findOneAndDelete({ _id: req.params.fileId })
    if (!file) throw new CustomError("File Not Found", 404);
    const filename = file.fileURL.split("uploads\\")[1];
    fs.unlinkSync(`uploads/${filename}`)

    res.status(200).json(response("File Deleted", file, true));
  };

  // Update one file
  async updateFile(req, res) {
    // Add file path to request body
    if (req.file.path) req.body["fileURL"] = req.file.path;

    const file = await File.findOne({ _id: req.params.fileId })
    if (!file) throw new CustomError("File Not Found", 404);

    const updatedFile = await File.findOneAndUpdate(
      { _id: req.params.fileId },
      { "$set": req.body },
      { new: true }
    )

    // Delete old file is another was added 
    if (req.file.path) {
      const filename = file.fileURL.split("uploads\\")[1];
      fs.unlinkSync(`uploads/${filename}`)
    }

    res.status(200).json(response("File updated successfully", updatedFile, true));
  }
}

module.exports = new FileContoller();
