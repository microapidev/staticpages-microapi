const File = require("./../models/file.model");
const response = require("./../utils/response");
const CustomError = require("./../utils/CustomError");
const fs = require("fs");
const validate = require("./../utils/validate");

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
    if (req.body && req.file) {
      const check = validate({ title: req.body.title, fileURL: req.file.path });

      if (!check.error) {
        req.body["fileURL"] = req.file.path;
        let file = new File(req.body);
        file.save();
        return res.status(201).json(response("File created", file, true));
      } else
        return res
          .status(422)
          .json(response(check.error.details[0].message, null, false));
    } else
      return res.status(406).json(response("Please, add a file", null, false));
  }

  // Get one file
  async getFile(req, res) {
    const file = await File.findOne({ _id: req.params.fileId });
    if (!file) throw new CustomError("File Not Found", 404);

    res.status(200).json(response("File Found", file, true));
  }

  //Get all files
  async getFiles(req, res) {
    const files = await File.find({});
    if (files && files.length < 1) res.status(200).json(response("No Files Found", files, true));

    res.status(200).json(response("All Files Found", files, true));
  }

  async updateFile(req, res) {
    // Add file path to request body

    if (req.file) req.body["fileURL"] = req.file.path;
    const check = validate(req.body);

    if (!check.error) {
      const file = await File.findOne(
        { _id: req.params.fileId },
        (err, file) => {
          if (file) {
            const filename = file.fileURL.split("uploads/")[1];
            fs.unlink(`uploads/${filename}`, async () => {
              const file = await File.findOneAndUpdate(
                {
                  _id: req.params.fileId,
                },
                req.body,
                { new: true },
                (err, file) => {
                  if (err)
                    throw new CustomError("Error: File could not be updated");

                  if (!file)
                    return res
                      .status(404)
                      .json(response("File with ID not found", null, false));

                  return res
                    .status(200)
                    .json(response("File updated successfully", file, true));
                }
              );
              if (!file) throw new CustomError("File Not Found", 404);
            });
          }

          if (err) throw new CustomError("Error occured while retriving files");

          if (!file)
            return res
              .status(404)
              .json(response("File Not Found", null, false));
        }
      );
      if (!file) throw new CustomError("File Not Found", 404);
    } else
      return res
        .status(406)
        .json(response(check.error.details[0].message, null, false));
  }

  async deleteFile(req, res) {
    const file = await File.findOne({ _id: req.params.fileId }, (err, file) => {
      if (file) {
        const filename = file.fileURL.split("uploads/")[1];
        fs.unlink(`uploads/${filename}`, async () => {
          const file = await File.deleteOne(
            { _id: req.params.id },
            (err, file) => {
              if (err)
                throw new CustomError("Error occured while deleting file");
              if (!file)
                return res
                  .status(404)
                  .json(response("File Not Found", null, false));

              res.status(200).json(response("File Deleted", null, true));
            }
          );
          if (!file) throw new CustomError("File Not Found", 404);
        });
      }
    });
    if (!file) throw new CustomError("File Not Found", 404);
  }

  // // Update one file
  // async updateFile(req, res) {
  //   // Add file path to request body
  //   if (req.file.path) req.body["fileURL"] = req.file.path;

  //   const file = await File.findOne({ _id: req.params.fileId });
  //   if (!file) throw new CustomError("File Not Found", 404);

  //   const updatedFile = await File.findOneAndUpdate(
  //     { _id: req.params.fileId },
  //     { $set: req.body },
  //     { new: true }
  //   );

  //   // Delete old file is another was added
  //   if (req.file.path) {
  //     const filename = file.fileURL.split("uploads\\")[1];
  //     fs.unlinkSync(`uploads/${filename}`);
  //   }

  //   res
  //     .status(200)
  //     .json(response("File updated successfully", updatedFile, true));
  // }
}

module.exports = new FileContoller();
