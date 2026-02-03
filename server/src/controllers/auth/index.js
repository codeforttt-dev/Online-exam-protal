const express = require("express");
const router = express.Router();
const signup = require("../../api/auth/signup");
const login = require("../../api/auth/login");
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;