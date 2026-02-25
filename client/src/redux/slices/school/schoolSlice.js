import { createSlice } from "@reduxjs/toolkit";
import { registerSchool, fetchSchools } 
from "../../thunks/school/schoolThunk";

const initialState = {
  schools: [],
  loading: false,
  error: null,
  success: false
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    resetSchoolState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSchool.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSchools.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload;
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetSchoolState } = schoolSlice.actions;
export default schoolSlice.reducer;