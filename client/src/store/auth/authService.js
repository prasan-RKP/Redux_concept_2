// store/auth/authService.js
import { axiosInstance } from "../../lib/axiosInstance.js";

// ------ This file handles only API calls ------

export const signupUser = async (userData) => {
  const response = await axiosInstance.post("/signup", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/login", userData);
  return response.data;
};

// ---- Check Current LoggedIn User
export const checkAuthUser = async () => {
  const response = await axiosInstance.get("/me");
  return response.data;
};

// ---- Logout user
export const logoutUser = async () => {
  const response = await axiosInstance.post("/logout");
  return response.data;
};