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
      return thunkAPI.rejectWithValue(err.response.data);
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
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
