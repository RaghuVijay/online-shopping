const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("./../models/authModel");

exports.signUp = async (req, res) => {
  try {
    let password = req.body.password;
    password = await bcrypt.hash(password, 10);
    const user = await auth.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password,
      gender: req.body.gender,
      roles: req.body.roles,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      pincode: req.body.pincode,
      country: req.body.country,
    });
    res.status(200).json({
      status: "success",
      message: "registered succesfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.logIn = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
      res.status(401).send("please enter email and password");
    }
    const confirmPassword = async function (userPassword, savedPassword) {
      return await bcrypt.verify(userPassword, savedPassword);
    };
    const user = await auth.findOne({ where: { email: req.body.email } });
    if (!user || !confirmPassword(password, user.password)) {
      res.status(401).send("please enter valid information");
    }

    const token = jwt.sign(
      { email, userId: user.userId, country: user.country },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_TIME,
      }
    );
    res.status(200).json({
      status: "success",
      message: "logged in successfully.",
      token,
    });
  } catch (err) {
    res.status(404).json({ status: "failed", message: err.message });
  }
};
