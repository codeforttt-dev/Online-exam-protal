import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import examReducer from "./slices/examCardSlice";
import formBReudcer from "./slices/FormBSlice";
import questionReducer from "./slices/questionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    exam: examReducer,
    formB: formBReudcer,
    question: questionReducer,
  },
});
export default store;