const asyncHandler = require("express-async-handler");
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id);
      next();
    }
  } catch (err) {
    res.status(401);
    throw new Error("Couldnt get Token");
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized, No Token");
  }
});

module.exports = protect;
