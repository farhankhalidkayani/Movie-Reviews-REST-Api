const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const connect = asyncHandler(async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}movies`);
  console.log("Db Connected Successfully");
});

module.exports = connect;
