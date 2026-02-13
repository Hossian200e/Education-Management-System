import axios from "axios";

// Base URL for your backend API
const API_BASE_URL = "http://localhost:5000/api/user-group-roles"; // Change this to your backend URL

/**
 * Get all user group roles
 * @returns {Promise} Axios response
 */
export const getUserGroupRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data; // Assuming API returns { data: [...] }
  } catch (error) {
    console.error("Error fetching user group roles:", error);
    throw error;
  }
};

/**
 * Get a single user group role by ID
 * @param {number|string} id
 * @returns {Promise} Axios response
 */
export const getUserGroupRoleById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data; // Assuming API returns { data: {...} }
  } catch (error) {
    console.error(`Error fetching role with id ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new user group role
 * @param {object} roleData - { name, groupId, description }
 * @returns {Promise} Axios response
 */
export const createUserGroupRole = async (roleData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, roleData);
    return response.data;
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  }
};

/**
 * Update an existing user group role
 * @param {number|string} id
 * @param {object} roleData - { name, groupId, description }
 * @returns {Promise} Axios response
 */
export const updateUserGroupRole = async (id, roleData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, roleData);
    return response.data;
  } catch (error) {
    console.error(`Error updating role with id ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a user group role
 * @param {number|string} id
 * @returns {Promise} Axios response
 */
export const deleteUserGroupRole = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting role with id ${id}:`, error);
    throw error;
  }
};
