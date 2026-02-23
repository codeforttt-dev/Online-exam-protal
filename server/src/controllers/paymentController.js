import Razorpay from "razorpay";
import crypto from "crypto";
import Purchase from "../models/purchaseModel.js";
import User from "../models/userModel.js";

/* ===========================
   CREATE RAZORPAY ORDER
=========================== */
// export const createRazorpayOrder = async (req, res) => {
//   try {

//     // ✅ create instance INSIDE function only
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const { amount } = req.body;

//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     });

//     res.json(order);

//   } catch (error) {
//     res.status(500).json({ message: "Payment order creation failed" });
//   }
// };

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    // ✅ FAKE ORDER FOR TESTING
    res.json({
      id: "test_order_" + Date.now(),
      amount: amount * 100,
      currency: "INR"
    });

  } catch (error) {
    res.status(500).json({ message: "Test order creation failed" });
  }
};

/* ===========================
   VERIFY PAYMENT
=========================== */


// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpayOrderId,
//       razorpayPaymentId,
//       razorpaySignature,
//       totalAmount,
//       name,
//       whatsapp,
//       studentClass,
//       examName
//     } = req.body;

//     const body = razorpayOrderId + "|" + razorpayPaymentId;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpaySignature) {
//       return res.status(400).json({ message: "Payment failed" });
//     }

//     /* ==============================
//        1️⃣ CREATE PURCHASE RECORD
//     ============================== */
//     const purchase = await Purchase.create({
//       name,
//       whatsapp,
//       examName,
//       studentClass,
//       price: totalAmount,
//       status: "success"
//     });

//     res.json({
//       message: "Payment success",
//       purchaseId: purchase._id
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Verification failed" });
//   }
// };

export const verifyPayment = async (req, res) => {
  try {
    const {
      totalAmount,
      name,
      whatsapp,
      studentClass,
      examName
    } = req.body;

    // ❌ SKIP RAZORPAY VERIFICATION FOR TESTING

    const purchase = await Purchase.create({
      name,
      whatsapp,
      studentClass,
      examName,
      price: totalAmount,
      status: "success"
    });

    res.json({
      message: "Test Payment Success",
      purchaseId: purchase._id
    });

  } catch (error) {
    res.status(500).json({ message: "Test Verification failed" });
  }
};

