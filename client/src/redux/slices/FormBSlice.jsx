import { createSlice } from "@reduxjs/toolkit";
import { registerExamThunk } from "../thunks/formBThunks";

const formBSlice = createSlice({
  name: "formB",
  initialState: {
    loading: false,
    success: false,
    error: null,
    registration: null,
  },
  reducers: {
    resetFormB: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.registration = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerExamThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerExamThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.registration = action.payload;
      })
      .addCase(registerExamThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetFormB } = formBSlice.actions;
export default formBSlice.reducer;
