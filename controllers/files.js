const File = require("./../models/file.model");
const response = require("./../utils/response");
const CustomError = require("./../utils/CustomError");
const fs = require("fs");
const validate = require("./../utils/validate");
const verifyFileLink = require("./../utils/verifyLink");

class FileContoller {
  // Add file
  async createFile(req, res) {
    if (req.body && req.file) {
      const check = validate({ title: req.body.title, fileURL: req.file.path });

      if (!check.error) {
        req.body["fileURL"] = req.file.path;
        let file = new File(req.body);
        file.save();
        return res
          .status(201)
          .send(
            response("File created", verifyFileLink(req, file), true, req, res)
          );
      } else
        return res
          .status(422)
          .send(
            response(check.error.details[0].message, null, false, req, res)
          );
    } else
      return res
        .status(406)
        .send(response("Please, add a file", null, false, req, res));
  }

  // Get one file
  async getFile(req, res) {
    const file = await File.findOne({ _id: req.params.fileId });
    if (!file) throw new CustomError("File Not Found", 404);

    res
      .status(200)
      .send(response("File Found", verifyFileLink(req, file), true, req, res));
  }

  //Get all files
  async getFiles(req, res) {
    const files = await File.find({});
    if (files && files.length < 1)
      return res
        .status(200)
        .send(response("No Files Found", files, true, req, res));

    res
      .status(200)
      .send(
        response("All Files Found", verifyFileLink(req, files), true, req, res)
      );
  }

  //Update one file
  async updateFile(req, res) {
    // Add file path to request body
    if (req.file) req.body["fileURL"] = req.file.path;
    const check = validate(req.body);
    if (check.error)
      res
        .status(406)
        .send(response(check.error.details[0].message, null, false, req, res));

    await File.findOne({ _id: req.params.fileId }, async (err, file) => {
      if (err) throw new CustomError("Error occured while retriving files");
      if (!file)
        return res
          .status(404)
          .send(response("File Not Found", null, false, req, res));

      const filename = file.fileURL.split("uploads/")[1];
      fs.unlinkSync(`uploads/${filename}`);
      await File.findOneAndUpdate(
        { _id: req.params.fileId },
        req.body,
        { new: true },
        (err, file) => {
          if (err) throw new CustomError("Error: File could not be updated");
          if (!file)
            return res
              .status(404)
              .send(response("File with ID not found", null, false, req, res));

          res
            .status(200)
            .send(
              response(
                "File updated successfully",
                verifyFileLink(req, file),
                true,
                req,
                res
              )
            );
        }
      );
    });
  }

  // Delte one file
  async deleteFile(req, res) {
    const file = await File.findOne({ _id: req.params.fileId });
    if (!file) throw new CustomError("File Not Found", 404);

    const filename = file.fileURL.split("uploads/")[1];

    fs.unlinkSync(`uploads/${filename}`);

    await File.deleteOne({ _id: req.params.fileId }, (err, file) => {
      if (err) throw new CustomError("Error occured while deleting file");
      if (!file)
        return res
          .status(404)
          .send(response("File Not Found", null, false, req, res));

      res
        .status(200)
        .send(
          response("File Deleted", verifyFileLink(req, file), true, req, res)
        );
    });
  }
}

module.exports = new FileContoller();
