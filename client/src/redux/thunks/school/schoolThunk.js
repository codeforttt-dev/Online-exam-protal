import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

/* REGISTER SCHOOL */
export const registerSchool = createAsyncThunk(
  "school/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/school/register", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "School registration failed"
      );
    }
  }
);

/* GET SCHOOL LIST */
export const fetchSchools = createAsyncThunk(
  "school/list",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/school/list");
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch schools");
    }
  }
);

export const checkSchoolUsername = createAsyncThunk(
  "school/checkUsername",
  async (username, { rejectWithValue }) => {
    try {
      const res = await API.get(
        `/school/check-username/${username}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Username check failed");
    }
  }
);

