// client/src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import examReducer from "./slices/examSlice";
import practiceTestReducer from "./slices/practiceTestSlice"; 

export const store = configureStore({
  reducer: {
    user: userReducer,
    exam: examReducer,
    practiceTests: practiceTestReducer, 
  },
});
