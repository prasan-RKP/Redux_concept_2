// store/auth/authThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signupUser,
  loginUser,
  checkAuthUser,
  logoutUser,
  fetchUserCart,
  addToCart,
} from "./authService.js";

// ---- SignUp Thunk
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await signupUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// ---- Login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await loginUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// ---- Check Auth (called on app load)
export const checkAuth = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const response = await checkAuthUser();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message,
    );
  }
});

// ---- Logout Thunk
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutUser();
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message,
    );
  }
});

// ---------- Cart Logics is here ------------

// ---- Cart Thunk

export const fetchCart = createAsyncThunk("auth/cart", async (_, thunkAPI) => {
  try {
    const response = await fetchUserCart();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message,
    );
  }
});

export const addCart = createAsyncThunk(
  "/auth/addToCart",
  async (cartData, thunkAPI) => {
    try {
      const response = await addToCart(cartData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
