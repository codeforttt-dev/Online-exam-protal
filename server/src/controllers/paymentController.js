import Razorpay from "razorpay";
import crypto from "crypto";
import PaymentLog from "../models/paymentLogModel.js";

/* ===========================
   CREATE RAZORPAY ORDER
=========================== */
export const createRazorpayOrder = async (req, res) => {
  try {

    // ✅ create instance INSIDE function only
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: "Payment order creation failed" });
  }
};


/* ===========================
   VERIFY PAYMENT
=========================== */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      totalAmount,
      name,
      whatsapp,
      studentClass,
      examName
    } = req.body;

    const body = razorpayOrderId + "|" + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      await PaymentLog.create({
        razorpayOrderId,
        razorpayPaymentId,
        amount: totalAmount,
        status: "FAILED",
        reason: "Invalid signature"
      });

      return res.status(400).json({ message: "Payment failed" });
    }

    await PaymentLog.create({
      razorpayOrderId,
      razorpayPaymentId,
      amount: totalAmount,
      status: "SUCCESS",
      reason: `Guest: ${name}, ${whatsapp}, ${studentClass}, ${examName}`
    });

    res.json({ message: "Payment success" });

  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};
