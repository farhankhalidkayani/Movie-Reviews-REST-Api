const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./src/db/connect.js");
dotenv.config();
const app = express();
app.use(cors());

connect();
try {
  app.listen(process.env.PORT);
  console.log(`Listening at PORT: ${process.env.PORT}`);
} catch (err) {
  console.log(`Error while listening : ${err}`);
}
