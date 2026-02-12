import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

/* =====================================================
   🟢 CREATE RAZORPAY ORDER
===================================================== */
export const createPaymentOrderThunk = createAsyncThunk(
  "payment/createOrder",
  async ({ amount }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/payment/create-order",
        { amount },
        { timeout: 15000 } // ⏱️ 15 sec timeout (mobile safe)
      );
      return res.data;
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        return rejectWithValue(
          "Payment service is slow. Please try again."
        );
      }
      return rejectWithValue(
        err.response?.data?.message || "Failed to create payment order"
      );
    }
  }
);

/* =====================================================
   🟢 VERIFY PAYMENT
===================================================== */
export const verifyPaymentThunk = createAsyncThunk(
  "payment/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/payment/verify", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Payment verification failed"
      );
    }
  }
);



