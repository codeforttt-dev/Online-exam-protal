import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// ✅ GET ALL EXAMS
export const fetchExams = createAsyncThunk(
  "exam/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/exams");   // matches getAllExams
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch exams"
      );
    }
  }
);


// ✅ CREATE EXAM
export const createExam = createAsyncThunk(
  "exam/create",
  async (examData, { rejectWithValue }) => {
    try {
      const res = await API.post("/exams", examData); // matches createExam
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create exam"
      );
    }
  }
);

