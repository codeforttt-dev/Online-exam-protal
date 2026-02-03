const express = require("express");
const router = express.Router();

// future me aur modules aa sakte hain
const authRoutes = require("../controllers/auth/index");

router.use("/auth", authRoutes);

module.exports = router; // ✅ SIRF ROUTER EXPORT
