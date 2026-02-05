import express from "express";
import protect from "../middleware/auth.js";

import {
  registerExam,
  myExams
} from "../controllers/registrationController.js";

const router = express.Router();


// must login
router.post("/register", protect, registerExam);
router.get("/my", protect, myExams);

export default router;
