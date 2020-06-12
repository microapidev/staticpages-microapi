const CustomError = require("./../utils/CustomError");
const response = require("./../utils/response");

const errors = (error, req, res, next) => {
  console.log(error.message)
  if (error instanceof CustomError) {
    res.status(error.status).json(response(error.message, null, false, req));
  } else if (error.name == "ValidationError") {
    res.status(400).send(response(error.message, null, false, req));
  } else if (error.name == "SyntaxError") {
    res.status(400).send(response(error.message, null, false, req));
  } else {
    res.status(500).send(response("Sorry something happened", null, false, req));
  }
};

module.exports = errors;
