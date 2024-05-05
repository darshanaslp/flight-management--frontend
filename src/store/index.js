// index.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import logger from "redux-logger";
import { setAuth } from "./users/userSlice";
import { isTokenExpired, refreshToken } from "./users/userThunk";

// Function to check token periodically and refresh if needed
const checkTokenExpiration = (store) => {
  setInterval(() => {
    const state = store.getState();
    const { token } = state.auth;

    if (isTokenExpired(token)) {
      // Dispatch refresh token action
      store.dispatch(refreshToken());
    }
  }, 300000); // Check every 5 minute
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Check for token and refreshToken in local storage and dispatch setAuth action if they exist
const token = localStorage.getItem("token");
const refreshTokens = localStorage.getItem("refreshToken");
if (token && refreshTokens) {
  store.dispatch(setAuth({ token, refreshTokens }));
}

// Start token expiration check
checkTokenExpiration(store);

export default store;
