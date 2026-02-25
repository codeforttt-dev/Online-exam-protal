import express from "express";
import {
  registerSchool,
  getSchools
} from "../../controllers/school/schoolRegistration-Controller.js";

const router = express.Router();

router.post("/register", registerSchool);
router.get("/list", getSchools);

export default router;