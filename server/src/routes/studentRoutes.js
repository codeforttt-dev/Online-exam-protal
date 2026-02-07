import express from "express";
import protect from "../middleware/auth.js";
import { studentDashboard } from "../controllers/studentController.js";

const router = express.Router();

router.get("/dashboard", protect, studentDashboard);

export default router;
