import express from "express";
import {
  getAllExams,
  createExam
} from "../controllers/examController.js";
import protect from "../middleware/auth.js";
import isAdmin from "../middleware/role.js";

const router = express.Router();


// public
router.get("/", getAllExams);


// admin only (later role check)
router.post("/", protect, isAdmin, createExam);

export default router;
