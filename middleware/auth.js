const jwt = require("jsonwebtoken");
const User = require("./../models/users.model");
const CustomError = require("./../utils/CustomError");
const jwtSecret = process.env.JWT_SECRET;

module.exports.authorize = () => {
  return async (req, res, next) => {
    console.log(jwtSecret);
    const decoded = jwt.verify(req.headers.authorization, jwtSecret);
    const user = await User.findOne({ _id: decoded.id });
    //check if user exists and active
    if (!user) throw new CustomError("unauthorized user", 401);
    //save decoded toeknt to request object
    req.user = user;
    
    next();
  }
}