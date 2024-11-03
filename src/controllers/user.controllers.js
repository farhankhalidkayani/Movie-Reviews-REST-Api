const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedpassword,
    role,
  });
  if (user) {
    res.status(200).json({
      username,
      email,
      token: generateToken(user._id),
      role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (user && passwordCorrect) {
    return res.status(200).json({
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.status(200).json({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("No such user Found");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

module.exports = {
  registerUser,
  loginUser,
  profile,
};
