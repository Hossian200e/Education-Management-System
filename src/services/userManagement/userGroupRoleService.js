import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/user-groups-role";

export const getAllGroupsWithRoles = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      return response.data.map((group) => ({
        group_id: group.id,
        user_group: group.user_group,
        created_by: group.created_by,
        created_time: group.created_at ? new Date(group.created_at).toLocaleString() : "-", // format nicely
        updated_by: group.updated_by,
        updated_time: group.updated_at ? new Date(group.updated_at).toLocaleString() : "-",
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching user groups:", error);
    return [];
  }
};
