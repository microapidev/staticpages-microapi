const mongoose = require('mongoose');
const shortid = require('shortid');

//define database schema & model for posts
const fileSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  title: { type: String },
  fileURL: { type: String },
  time: { type: Date, default: Date.now }
});

const File = mongoose.model("Upload", fileSchema);

module.exports = File;