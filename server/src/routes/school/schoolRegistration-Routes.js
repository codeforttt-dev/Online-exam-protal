import express from "express";
import {
  registerSchool,
  getSchools,
  checkSchoolUsername
} from "../../controllers/school/schoolRegistration-Controller.js";

const router = express.Router();

router.post("/register", registerSchool);
router.get("/list", getSchools);
router.get("/check-username/:username", checkSchoolUsername);

export default router;