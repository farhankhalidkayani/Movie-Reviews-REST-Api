const express = require("express");
const protect = require("../middleware/auth.middleware.js");
const {
  registerUser,
  loginUser,
  profile,
} = require("../controllers/user.controllers.js");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, profile);

module.exports = router;
