// server/src/routes/practiceTestRoutes.js
import express from "express";
import protect from "../middleware/auth.js";
import { getPracticeTests } from "../controllers/practiceTestController.js";

const router = express.Router();

// student ke liye practice tests
router.get("/", protect, getPracticeTests);

export default router;
