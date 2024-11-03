const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./src/db/connect.js");
const userRoutes = require("./src/routes/user.routes.js");
const movieRoutes = require("./src/routes/movie.routes.js");

dotenv.config();
const app = express();

connect();
try {
  app.listen(process.env.PORT);
  console.log(`Listening at PORT: ${process.env.PORT}`);
} catch (err) {
  console.log(`Error while listening : ${err}`);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
