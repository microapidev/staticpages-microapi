const CustomError = require("./../utils/CustomError");
const response = require("./../utils/response");

const errors = (error, req, res, next) => {
  if (error instanceof CustomError) {
    res.status(error.status).json(response(error.message, null, false));
  } else {
    res.status(500).send(response("Sorry something happened", null, false));
  }
};

module.exports = errors;
