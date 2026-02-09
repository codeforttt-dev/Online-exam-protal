import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";


export const signupUser = createAsyncThunk(
  "users/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/users/signup", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Signup Failed"
      );
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
return rejectWithValue(
  err.response?.data?.message || "Request Failed"
);  
  }
  }
);
