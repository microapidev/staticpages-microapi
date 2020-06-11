const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || "mongodb+srv://team-falcon:sbNhZe5T9uX5vghG@cluster0-8sraf.mongodb.net/uploads?retryWrites=true&w=majority"

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

function initializeDB() {
  mongoose
    .connect(uri, options)
    .then(() => console.log(":: Connected to database"))
    .catch((error) => console.log(":: Couldn't connect to database ", error));
}

module.exports = initializeDB;
