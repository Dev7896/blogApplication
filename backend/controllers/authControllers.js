const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { encryption } = require("../services/authServices");
// const { validate } = require("deep-email-validator");
require("dotenv").config();

// registration
async function createUser(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "missing credentials",
      });
    }

    // const validationResult = await validate(email);
    // if (!validationResult.valid) {
    //   return res.json({ error: true, messaage: validationResult.reason });
    // }

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.json({ error: true, message: "user already exists" });
    }

    const hashedPassword = await encryption(password);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRETKEY, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token: token,
      messaage: "user created succesfully",
    });
  } catch (error) {
    res.json({
      error: true,
      message: "error creating user",
    });
    return next(error);
  }
}

// login
async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "missing credentials",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        errro: true,
        message: "user not found",
      });
    }
    const flag = await bcrypt.compare(password, user.password);
    if (!flag) {
      return res
        .status(403)
        .json({ error: true, message: "unauthorized user" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRETKEY, {
      expiresIn: "7d",
    });
    return res.json({
      success: true,
      message: "user logged in succesfully",
      token,
      data: { user: user },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createUser,
  loginUser,
};
