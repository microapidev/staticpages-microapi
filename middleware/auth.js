const jwt = require("jsonwebtoken");
const User = require("./../models/users.model");
const CustomError = require("./../utils/CustomError");
const response = require("./../utils/response");

module.exports.authorize = () => {
  return async (req, res, next) => {
    if (req.headers.authorization) {
      const decoded = await jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.JWT_SECRET
      );

      const user = await User.findOne({ _id: decoded.id });
      // console.log(user);

      //check if user exists and active
      if (!user) throw new CustomError("unauthorized user", 401);

      //save decoded toeknt to request object
      req.user = user;
      // console.log(req);
      next();
    } else
      res.status(404).json({
        message: "Authorization token required",
        data: null,
        success: false,
      });
  };
};
