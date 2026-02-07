import axios from "axios";

// Backend base URL
const API_URL = "http://localhost:5000/api/auth/";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "login", {
      email,      // backend expects "email"
      password,
    });
    return response.data; // return backend response
  } catch (error) {
    // Return backend error message if available
    throw error.response?.data || { message: error.message };
  }
};
