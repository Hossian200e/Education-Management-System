import axios from "axios";

/* ===============================
   AXIOS INSTANCE
================================= */

const API = axios.create({
  baseURL: "http://localhost:5000/api", // 🔁 Change if your backend port is different
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   REQUEST INTERCEPTOR (JWT TOKEN)
================================= */

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // JWT token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===============================
   USER GROUP APIs
================================= */

/* 🔹 Get All User Groups */
export const getUserGroups = async () => {
  try {
    const response = await API.get("/user-groups");
    return response.data;
  } catch (error) {
    console.error("Get User Groups Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

/* 🔹 Get Single User Group By ID */
export const getUserGroupById = async (id) => {
  try {
    const response = await API.get(`/user-groups/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get User Group By ID Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

/* 🔹 Create User Group */
export const createUserGroup = async (data) => {
  try {
    const response = await API.post("/user-groups", data);
    return response.data;
  } catch (error) {
    console.error("Create User Group Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

/* 🔹 Update User Group */
export const updateUserGroup = async (id, data) => {
  try {
    const response = await API.put(`/user-groups/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update User Group Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

/* 🔹 Delete User Group (Optional) */
export const deleteUserGroup = async (id) => {
  try {
    const response = await API.delete(`/user-groups/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete User Group Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
