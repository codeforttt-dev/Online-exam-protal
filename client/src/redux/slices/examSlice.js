import { createSlice } from "@reduxjs/toolkit";
import { fetchExams } from "../thunks/examThunk";

const examSlice = createSlice({
  name: "exam",

  initialState: {
    exams: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })

      .addCase(fetchExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default examSlice.reducer;
