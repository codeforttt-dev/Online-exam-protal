import express from "express";
import protect from "../middleware/auth.js";
import {
  getPracticeTests,
  startPracticeTest,
  loadBranch,
  submitPracticeTest
} from "../controllers/practiceTestController.js";

const router = express.Router();

/* =========================
   PRACTICE TEST LIST
========================= */
router.get("/", protect, getPracticeTests);

/* =========================
   START PRACTICE TEST
========================= */
router.get("/start/:examId", protect, startPracticeTest);

/* =========================
   LOAD BRANCH QUESTIONS
========================= */
router.get("/branch/:examId/:choice", protect, loadBranch);

/* =========================
   SUBMIT PRACTICE TEST
========================= */
router.post("/submit", protect, submitPracticeTest);

export default router;
