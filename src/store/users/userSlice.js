// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, refreshToken } from "./userThunk";

const initialState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      // Remove token and refresh token from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, refreshToken } = action.payload;
        state.isAuthenticated = true;
        state.token = token;
        state.refreshToken = refreshToken;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        //state.error = action.payload;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { token, refreshToken } = action.payload;
        state.isAuthenticated = true;
        state.token = token;
        state.refreshToken = refreshToken;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        const { token, refreshToken } = action.payload;
        state.token = token;
        state.refreshToken = refreshToken;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { setAuth, logout } = userSlice.actions;

export default userSlice.reducer;
