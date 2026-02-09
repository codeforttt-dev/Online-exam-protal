// client/src/redux/slices/practiceTestSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchPracticeTests } from "../thunks/practiceTestThunk";

const practiceTestSlice = createSlice({
  name: "practiceTests",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPracticeTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPracticeTests.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchPracticeTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load practice tests";
      });
  },
});

export default practiceTestSlice.reducer;
