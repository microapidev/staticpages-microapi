const File = require("./../models/file.model");
const response = require("./../utils/response");
const CustomError = require("./../utils/CustomError");
const fs = require("fs");
const validate = require("./../utils/validate");

const verifyFileLink = (req, data) => {
  if (req.user.fullURL) {
    if (data instanceof Array)
      return  data.map(datum => {
        datum["fullURL"] = `https://file.microapi.dev/${datum.fileURL}`
        return datum
      })

    return data["fullURL"] = `https://file.microapi.dev/${data.fileURL}`;
  }

  return data
}

class FileContoller {

  // Add file
  async createFile(req, res) {
    
    if (req.body && req.file) {
      const check = validate({ title: req.body.title, fileURL: req.file.path });

      if (!check.error) {
        req.body["fileURL"] = req.file.path;
        req.body["userID"] = req.user.email;
        let file = new File(req.body);
        file.save();
        return res.status(201).send(response("File created", verifyFileLink(req, file), true, req));
      } else
        return res
          .status(422)
          .send(response(check.error.details[0].message, null, false, req));
    } else
      return res.status(406).send(response("Please, add a file", null, false, req));
  }

  // Get one file
  async getFile(req, res) {
    const file = await File.findOne({ _id: req.params.fileId, userId: req.user.email });
    if (!file) throw new CustomError("File Not Found", 404);

    res.status(200).send(response("File Found", verifyFileLink(req, file), true, req));
  }

  //Get all files
  async getFiles(req, res) {
    const files = await File.find({ userId: req.user.email });
    if (files && files.length < 1) return res.status(200).send(response("No Files Found", files, true, req));

    res.status(200).send(response("All Files Found", verifyFileLink(req, files), true, req));
  }

  //Update one file
  async updateFile(req, res) {
    // Add file path to request body
    if (req.file) req.body["fileURL"] = req.file.path;
    const check = validate(req.body);
    if (!check.error) res.status(406).send(response(check.error.details[0].message, null, false, req));

    await File.findOne({ _id: req.params.fileId, userId: req.user.email }, async (err, file) => {
      if (err) throw new CustomError("Error occured while retriving files");
      if (!file) return res.status(404).send(response("File Not Found", null, false, req));


      const filename = file.fileURL.split("uploads/")[1];
      try {
        fs.unlinkSync(`uploads/${filename}`);
      } catch {}

      await File.findOneAndUpdate(
        { _id: req.params.fileId, userId: req.user.email },
        req.body,
        { new: true },
        (err, file) => {
          if (err) throw new CustomError("Error: File could not be updated");
          if (!file) return res.status(404).send(response("File with ID not found", null, false, req));

          res.status(200).send(response("File updated successfully", verifyFileLink(req, file), true, req));
        }
      );
    });
  }

  // Delte one file
  async deleteFile(req, res) {
    const file = await File.findOne({ _id: req.params.fileId, userId: req.user.email })
    if (!file) throw new CustomError("File Not Found", 404);

    const filename = file.fileURL.split("uploads/")[1];

    try {
      fs.unlinkSync(`uploads/${filename}`);
    } catch {}

    await File.deleteOne({ _id: req.params.fileId, userId: req.user.email }, (err, file) => {
      if (err)
        throw new CustomError("Error occured while deleting file");
      if (!file)
        return res.status(404).send(response("File Not Found", null, false, req));

      res.status(200).send(response("File Deleted", verifyFileLink(req, file), true, req));
    });
  }

}

module.exports = new FileContoller();
