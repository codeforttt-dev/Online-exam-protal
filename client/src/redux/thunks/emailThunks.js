import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// FORGOT PASSWORD
export const forgotPassword = createAsyncThunk(
  "email/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        "/users/forgot-password",
        { email }
      );
      return data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to send reset link"
      );
    }
  }
);

// RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "email/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        `/users/reset-password/${token}`,
        { password }
      );
      return data.message;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Reset failed"
      );
    }
  }
);
