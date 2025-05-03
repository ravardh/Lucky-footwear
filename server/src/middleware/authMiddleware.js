import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const userProtect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.key);
      req.user = user;
      next();
    } catch (error) {
      const err = new Error("Not Authorized, Token Failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    const err = new Error("Not Authorized, No Token");
    err.statusCode = 401;
    next(err);
  }
};
