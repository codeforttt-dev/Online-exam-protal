import express from "express";
import { registerUser, loginUser, checkUsername } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.get("/check-username/:username", checkUsername);
router.post("/login", loginUser);

export default router;
