// src/features/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userData: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserData = (state) => state.auth.userData;

export default authSlice.reducer;
