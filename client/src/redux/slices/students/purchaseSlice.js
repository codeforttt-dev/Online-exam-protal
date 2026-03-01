import { createSlice } from "@reduxjs/toolkit";
import { purchaseExam, fetchPurchases } from "../../thunks/students/purchaseThunk";

const purchaseSlice = createSlice({
  name: "purchase",

  initialState: {
    loading: false,
    purchases: [],
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    /* CREATE */
    builder
      .addCase(purchaseExam.pending, (state) => {
        state.loading = true;
      })
      .addCase(purchaseExam.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases.push(action.payload);
      })
      .addCase(purchaseExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* FETCH */
    builder.addCase(fetchPurchases.fulfilled, (state, action) => {
      state.purchases = action.payload;
    });
  }
});

export default purchaseSlice.reducer;
