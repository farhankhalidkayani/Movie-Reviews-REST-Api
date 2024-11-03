const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    res.status(401);
    throw new Error("Access Denies!!! not an ADMIN");
  }
  next();
});

module.exports = isAdmin;
