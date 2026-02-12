import express from "express";
import { purchaseExam, getPurchases } from "../controllers/purchaseController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/",  purchaseExam);
router.get("/",  getPurchases);

export default router;
