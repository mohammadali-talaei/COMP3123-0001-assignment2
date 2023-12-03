const express = require("express");
const User = require("../models/User");
const userRoute = express.Router();
const Bcrypt = require("bcrypt");

userRoute.post("/signup", async (req, res) => {
  console.log(req.body);
  const saltRounds = 10;
  const salt = await Bcrypt.genSalt(saltRounds);
  const hash = await Bcrypt.hash(req.body.password, salt);

  const account = new User({
    ...req.body,
    password: hash,
  });
  // try{
  await account.save();
  res.status(201).json(account);
  return;
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }, "username password email");

  if (!user) {
    // User not found
    res.status(401).json({
      status: false,
      message: "Invalid email and Password",
    });
  }

  const set = await Bcrypt.compare(req.body.password, user.password);

  if (!set) {
    res.status(401).json({
      status: false,
      message: "Invalid email and Password",
    });
  }

  res.status(200).json({
    status: true,
    email: user.email,
    message: "User logged in successfully",
  });
});

module.exports = userRoute;
