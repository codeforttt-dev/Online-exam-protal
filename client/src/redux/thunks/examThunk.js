import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchExams = createAsyncThunk(
  "exam/fetchExams",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/exams");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to load exams"
      );
    }
  }
);
