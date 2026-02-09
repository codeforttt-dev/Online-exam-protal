// src/redux/thunks/userThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

/* ========== SIGNUP ========== */
export const signupUser = createAsyncThunk(
  "users/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/users/signup", data);
      // res.data me: { _id, name, username, email, role, token }
      const payload = {
        user: {
          _id: res.data._id,
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
          role: res.data.role,
        },
        token: res.data.token,
      };

      // optional: signup ke baad bhi token store rakhna ho to
      if (payload.token) {
        localStorage.setItem("token", payload.token);
      }

      return payload;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Signup failed");
    }
  }
);

/* ========== LOGIN ========== */
export const loginUser = createAsyncThunk(
  "users/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/users/login", data);
      // backend se jo send ho raha hai:
      // { _id, name, username, email, role, token }

      const payload = {
        user: {
          _id: res.data._id,
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
          role: res.data.role,
        },
        token: res.data.token,
      };

      // 🔐 token ko localStorage me store karo
      if (payload.token) {
        localStorage.setItem("token", payload.token);
      }

      return payload;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);
