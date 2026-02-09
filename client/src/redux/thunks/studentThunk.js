// client/src/redux/thunks/studentThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchStudentDashboard = createAsyncThunk(
  "student/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/student/dashboard");
      return res.data; // { registrations, results, studyMinutes, upcomingExams, resources }
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to load student dashboard"
      );
    }
  }
);
