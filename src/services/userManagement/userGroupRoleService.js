import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/user-groups-role";

/**
 * Fetch all user groups with roles
 */
export const getAllGroupsWithRoles = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    if (response.status === 200) {
      return response.data.map((group) => ({
        group_id: group.group_id,
        user_group: group.user_group,
        created_by: group.created_by || "system",
        created_time: group.createdAt,
        updated_by: group.updated_by || "system",
        updated_time: group.updatedAt,
        role_name: group.role || "-", // optional
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching user groups with roles:", error);
    return [];
  }
};

/**
 * Fetch roles by group ID
 */
export const getGroupRolesById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.status === 200 ? response.data : [];
  } catch (error) {
    console.error(`Error fetching user group ${id} roles:`, error);
    return [];
  }
};
