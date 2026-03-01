// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { signupUser, checkUsername} from "../../thunks/students/userThunk";

const savedToken = localStorage.getItem("token");

const initialState = {
  user: null,          // tabhi set hoga jab signup/login success hoga
  token: savedToken || null,
  loading: false,
  error: null,
  usernameAvailable: null,   // true | false | null
  usernameChecking: false,
  lastCheckedUsername: null
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

      resetUsernameStatus: (state) => {
        state.usernameAvailable = null;
        state.usernameChecking = false;
        state.lastCheckedUsername = null;
      }
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
      .addCase(checkUsername.pending, (state) => {
        state.usernameChecking = true;
        state.usernameAvailable = null;
      })
      .addCase(checkUsername.fulfilled, (state, action) => {
        state.usernameChecking = false;
        state.usernameAvailable = action.payload.available;
        state.lastCheckedUsername = action.meta.arg;   // VERY IMPORTANT
      })
      .addCase(checkUsername.rejected, (state) => {
        state.usernameChecking = false;
        state.usernameAvailable = null;
      })
  },
});

export const { logout, resetUsernameStatus } = userSlice.actions;
export default userSlice.reducer;
