import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/userController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);


// Protected route example
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;
