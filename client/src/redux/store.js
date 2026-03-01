// client/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/students/userSlice";
import examReducer from "./slices/examSlice";
import practiceTestReducer from "./slices/practiceTestSlice"; 
import purchaseReducer from "./slices/students/purchaseSlice";
import paymentReducer from "./slices/paymentSlice";
import schoolReducer from "./slices/school/schoolSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    school: schoolReducer,
    exam: examReducer,
    practiceTests: practiceTestReducer, 
    purchase: purchaseReducer,
    payment: paymentReducer,
  },
});


