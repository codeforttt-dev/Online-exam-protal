import { createSlice } from "@reduxjs/toolkit";
import { signupUser, loginUser } from "../thunks/userThunk";

const initialState = {
  user: null,
  token: null,
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
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
      })

      // login
      .addCase(loginUser.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;

  state.user = {
    _id: action.payload._id,
    username: action.payload.username,
    role: action.payload.role,
  };

  state.token = action.payload.token;

  localStorage.setItem("token", action.payload.token);
})
.addCase(loginUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
