// ---------- This file only handle (ASync business logic) ------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { signupUser, loginUser } from "./authService.js";

// ---- SignUp Thunk
export const signup = createAsyncThunk(
  "auth/signup",

  async (userData, thunkAPI) => {
    try {
      const response = await signupUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);


// ---- Login thunk
export const login = createAsyncThunk(
  "/auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await loginUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);
