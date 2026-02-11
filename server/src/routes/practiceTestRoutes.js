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
   1️⃣ PRACTICE TEST LIST
========================= */
router.get("/", protect, getPracticeTests);

/* =========================
   2️⃣ START PRACTICE TEST
   ✅ FIXED: :testId → :examCode
========================= */
router.get("/start/:examCode", protect, startPracticeTest);

/* =========================
   3️⃣ LOAD BRANCH QUESTIONS
   ✅ FIXED: :testId → :examCode
========================= */
router.get("/branch/:examCode/:choice", protect, loadBranch);

/* =========================
   4️⃣ SUBMIT PRACTICE TEST
========================= */
router.post("/submit", protect, submitPracticeTest);

export default router;
