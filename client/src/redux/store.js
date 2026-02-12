// client/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import examReducer from "./slices/examSlice";
import practiceTestReducer from "./slices/practiceTestSlice"; 
import purchaseReducer from "./slices/purchaseSlice";
import paymentReducer from "./slices/paymentSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    exam: examReducer,
    practiceTests: practiceTestReducer, 
    purchase: purchaseReducer,
    payment: paymentReducer,
  },
});


