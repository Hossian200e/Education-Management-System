// src/services/authService.js

import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // replace with your backend URL

// Login function (you already have)
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// NEW: Request password reset
export const requestPasswordReset = async (identifier) => {
  const response = await axios.post(`${API_URL}/forget-password`, { identifier });
  return response.data;
};
