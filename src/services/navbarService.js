import axios from "axios";

const API = axios.create({
  baseURL: "https://your-api-url.com", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchNotifications = async () => {
  try {
    // return real API response
    // const res = await API.get("/notifications");
    // return res.data;

    // Dummy data for now
    return [
      { id: 1, text: "New student registered", unread: true },
      { id: 2, text: "System backup completed", unread: false },
    ];
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return [];
  }
};

export const fetchMessages = async () => {
  try {
    // const res = await API.get("/messages");
    // return res.data;

    // Dummy data for now
    return [
      { id: 1, text: "New message from John", unread: true },
      { id: 2, text: "Project update submitted", unread: true },
    ];
  } catch (err) {
    console.error("Error fetching messages:", err);
    return [];
  }
};
