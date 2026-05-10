import { axiosInstance } from "../../lib/axiosInstance";

// ------ This file/filed handles only API calls ------

export const signupUser = async (userData) => {
  const response = await axiosInstance.post("/signup", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/login", userData);
  return response.data;
};
