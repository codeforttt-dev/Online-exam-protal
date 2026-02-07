import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
<<<<<<< HEAD
import examReducer from "./slices/examCardSlice";
import formBReudcer from "./slices/FormBSlice";
import questionReducer from "./slices/questionSlice";
=======
import examReducer from "./slices/examSlice";
>>>>>>> 42baef09a0f2db12ebeffaeba1ee0e7575146882

export const store = configureStore({
  reducer: {
    user: userReducer,
    exam: examReducer,
<<<<<<< HEAD
    formB: formBReudcer,
    question: questionReducer,
=======
>>>>>>> 42baef09a0f2db12ebeffaeba1ee0e7575146882
  },
});
export default store;