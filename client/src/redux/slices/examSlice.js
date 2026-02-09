// client/src/redux/slices/examSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentDashboard } from "../thunks/studentThunk";

const examSlice = createSlice({
  name: "exam",
  initialState: {
    dashboard: {
      registrations: [],
      results: [],
      studyMinutes: 0,
      upcomingExams: [],
      resources: [],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = {
          registrations: action.payload.registrations || [],
          results: action.payload.results || [],
          studyMinutes: action.payload.studyMinutes || 0,
          upcomingExams: action.payload.upcomingExams || [],
          resources: action.payload.resources || [],
        };
      })
      .addCase(fetchStudentDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load dashboard";
      });
  },
});

export default examSlice.reducer;
