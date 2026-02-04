import express from "express";
import {
  getAllExams,
  createExam
} from "../controllers/examController.js";
import protect from "../middleware/auth.js";

const router = express.Router();


// public
router.get("/", getAllExams);


// admin only (later role check)
router.post("/", protect, createExam);

export default router;
