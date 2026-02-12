// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { signupUser,} from "../thunks/userThunk";

const savedToken = localStorage.getItem("token");

const initialState = {
  user: null,          // tabhi set hoga jab signup/login success hoga
  token: savedToken || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user || null;
          state.token = action.payload.token || null;
          if (action.payload.token) {
            localStorage.setItem("token", action.payload.token);
          }
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      })
      // .addCase(loginUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload.user;
      //   state.token = action.payload.token;
      //   localStorage.setItem("token", action.payload.token);
      // })
      // .addCase(loginUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload || "Login failed";
      // });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
