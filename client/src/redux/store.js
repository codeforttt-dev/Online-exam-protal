import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

import formBReudcer from "./slices/FormBSlice";
import questionReducer from "./slices/questionSlice";
import emailReducer from "./slices/emailSlice";
import examReducer from "./slices/examCardSlice";



export const store = configureStore({
  reducer: {
    user: userReducer,
    exam: examReducer,
 email: emailReducer,
    formB: formBReudcer,
    question: questionReducer,
  },
});
export default store;