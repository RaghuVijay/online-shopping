const express = require("express");
const authControllers = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authControllers.signUp);
router.post("/login", authControllers.logIn);

module.exports = router;
