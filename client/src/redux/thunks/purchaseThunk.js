import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

/* SAVE PURCHASE */
export const purchaseExam = createAsyncThunk(
  "purchase/create",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/purchases", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const checkPurchaseThunk = createAsyncThunk(
  "purchase/check",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/purchases/check", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Purchase not found"
      );
    }
  }
);


/* GET HISTORY */
export const fetchPurchases = createAsyncThunk(
  "purchase/history",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/purchases");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);
