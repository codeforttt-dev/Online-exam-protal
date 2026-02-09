// client/src/redux/thunks/practiceTestThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const fetchPracticeTests = createAsyncThunk(
  "practiceTests/fetchPracticeTests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/practice-tests");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load practice tests"
      );
    }
  }
);
