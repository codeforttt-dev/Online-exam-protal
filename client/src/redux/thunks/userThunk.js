import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";


// SIGNUP
export const signupUser = createAsyncThunk(
  "users/home",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/users/home", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);


// LOGIN
export const loginUser = createAsyncThunk(
  "users/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/users/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
