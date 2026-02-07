import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerExamThunk = createAsyncThunk(
  "formB/registerExam",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/registrations/register",
        formData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
 export default registerExamThunk;