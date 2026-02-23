import express from "express";
import { purchaseExam, getPurchases, checkPurchase } from "../controllers/purchaseController.js";


const router = express.Router();

router.post("/",  purchaseExam);
router.get("/",  getPurchases);
router.post("/check", checkPurchase);


export default router;
