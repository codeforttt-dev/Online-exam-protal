import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import examReducer from "./slices/examSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    exam: examReducer,
  },
});
