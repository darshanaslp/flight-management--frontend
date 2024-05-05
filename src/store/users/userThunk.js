// userThunk.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/user/userService";
import { setAuth } from "./userSlice";
import { jwtDecode } from "jwt-decode";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await userService.login(email, password);
      const { token, refreshToken } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("email", email);
      dispatch(setAuth({ token, refreshToken }));
      return response;
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await userService.register(name, email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTokenExpirationDate = (token) => {
  const decodedToken = jwtDecode(token);
  if (!decodedToken.exp) {
    return null;
  }

  const expirationDate = new Date(decodedToken.exp * 1000); // Convert seconds to milliseconds
  return expirationDate;
};

// Function to check if the token is expired
export const isTokenExpired = (token) => {
  const expirationDate = getTokenExpirationDate(token);
  if (!expirationDate) {
    return true; // Token has no expiration date
  }
  return expirationDate < new Date(); // Compare with current time
};

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const { refreshToken, token } = getState().user;

      // Check if token is expired
      if (isTokenExpired(token)) {
        // If token is expired, use refresh token to get a new token
        const response = await userService.refreshToken(refreshToken);
        const { token: newToken, refreshToken: newRefreshToken } = response;
        localStorage.setItem("token", newToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        dispatch(setAuth({ token: newToken, refreshToken: newRefreshToken }));
        return response;
      } else {
        // If token is not expired, return existing token
        return { token, refreshToken };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
