import express from "express";
import protect from "../middleware/auth.js";
import isAdmin from "../middleware/role.js";
import { adminDashboard } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", protect, isAdmin, adminDashboard);

export default router;
