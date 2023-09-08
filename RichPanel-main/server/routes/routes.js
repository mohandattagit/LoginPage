const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/signup.js");
const { login } = require("../controllers/login.js");
router.post("/v1/auth/signup", signup);
router.post("/v1/auth/login", login);
exports.router = router;
