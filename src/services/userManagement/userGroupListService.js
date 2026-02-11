// src/services/userManagement/userGroupListService.js

/**
 * Service for managing User Groups
 * Currently uses localStorage as a mock database
 */

const STORAGE_KEY = "groups";

/**
 * Get all user groups
 * @returns {Array} Array of user group objects
 */
export const getUserGroups = () => {
  try {
    const groups = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return groups;
  } catch (error) {
    console.error("Error fetching user groups:", error);
    return [];
  }
};

/**
 * Get a single user group by ID
 * @param {number|string} id - Group ID
 * @returns {Object|null} Group object or null if not found
 */
export const getUserGroupById = (id) => {
  const groups = getUserGroups();
  return groups.find((group) => group.id === parseInt(id)) || null;
};

/**
 * Add a new user group
 * @param {Object} group - Group object { name, code, ordering }
 * @returns {Object} Added group with generated ID
 */
export const addUserGroup = (group) => {
  const groups = getUserGroups();
  const newGroup = {
    id: groups.length > 0 ? groups[groups.length - 1].id + 1 : 1,
    ...group,
  };
  groups.push(newGroup);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  return newGroup;
};

/**
 * Update an existing user group
 * @param {number|string} id - Group ID
 * @param {Object} updatedGroup - Updated group data
 * @returns {Object|null} Updated group or null if not found
 */
export const updateUserGroup = (id, updatedGroup) => {
  const groups = getUserGroups();
  const index = groups.findIndex((group) => group.id === parseInt(id));
  if (index === -1) return null;

  groups[index] = { ...groups[index], ...updatedGroup };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  return groups[index];
};

/**
 * Delete a user group
 * @param {number|string} id - Group ID
 * @returns {boolean} True if deleted, false if not found
 */
export const deleteUserGroup = (id) => {
  let groups = getUserGroups();
  const initialLength = groups.length;
  groups = groups.filter((group) => group.id !== parseInt(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  return groups.length < initialLength;
};
