const jwt = require("jsonwebtoken");
const User = require("../models/");
const CustomError = require("../helpers/CustomError");

module.exports.authorize = (roles = []) => {
  return async (req, res, next) => {
    const decoded = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });

    //check if user exists and active
    if (!user || !user.isActive) throw new CustomError("unauthorized user", 401);
    //check if user has permission
    if (roles.length && !roles.includes(user.role)) throw new CustomError("unauthorized user", 401);
    //save decoded toeknt to request object
    req.user = decoded;

    next();
  }
}