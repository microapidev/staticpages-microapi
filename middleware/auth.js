const jwt = require("jsonwebtoken");
const User = require("./../models/users.model");
const CustomError = require("./../utils/CustomError");

module.exports.authorize = () => {
  return async (req, res, next) => {
    const decoded = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });

    //check if user exists and active
    if (!user) throw new CustomError("unauthorized user", 401);

    //save decoded toeknt to request object
    req.user = user;

    next();
  }
}