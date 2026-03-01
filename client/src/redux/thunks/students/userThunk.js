// src/redux/thunks/userThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

/* ========== SIGNUP ========== */
export const signupUser = createAsyncThunk(
  "/user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/signup", data);
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

export const checkUsername = createAsyncThunk(
  "user/checkUsername",
  async (username, { rejectWithValue }) => {
    try {
      const res = await API.get(`/auth/check-username/${username}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Username check failed"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (data, thunkAPI) => {
    try {
      const res = await API.put("/users/profile", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


