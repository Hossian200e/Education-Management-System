import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { FaUsers, FaEnvelope, FaBell, FaPlus, FaTasks } from "react-icons/fa";

// Dummy data for demo
const dummyStats = [
  { id: 1, title: "Users", value: 1520, icon: <FaUsers /> },
  { id: 2, title: "Messages", value: 87, icon: <FaEnvelope /> },
  { id: 3, title: "Notifications", value: 23, icon: <FaBell /> },
  { id: 4, title: "Tasks", value: 12, icon: <FaTasks /> },
];

const dummyNotifications = [
  { id: 1, text: "New user registered", unread: true },
  { id: 2, text: "Server maintenance at 2 PM", unread: false },
  { id: 3, text: "New message from John", unread: true },
];

const dummyMessages = [
  { id: 1, text: "Hi, please check the report", unread: true },
  { id: 2, text: "Meeting rescheduled to 4 PM", unread: false },
];

const Dashboard = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [messages, setMessages] = useState(dummyMessages);

  const markRead = (type, id) => {
    if (type === "notifications") setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    if (type === "messages") setMessages(prev => prev.map(m => m.id === id ? { ...m, unread: false } : m));
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Header */}
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "8px" }}>Dashboard</h1>
          <p style={{ color: "#6b7280" }}>Overview of your system metrics and notifications</p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {dummyStats.map(stat => (
            <div
              key={stat.id}
              style={{
                flex: "1 1 200px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "transform 0.2s",
              }}
              className="dashboard-card"
            >
              <div style={{ fontSize: "24px", color: "#3b82f6" }}>{stat.icon}</div>
              <div>
                <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{stat.title}</div>
                <div style={{ fontSize: "20px", fontWeight: "600" }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Quick Actions</h2>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button style={buttonStyle}><FaPlus /> Add User</button>
            <button style={buttonStyle}><FaEnvelope /> Send Message</button>
            <button style={buttonStyle}><FaTasks /> Add Task</button>
          </div>
        </div>

        {/* Notifications & Messages */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {/* Notifications */}
          <div style={listContainerStyle}>
            <h3 style={listHeaderStyle}>Recent Notifications</h3>
            <ul style={listStyle}>
              {notifications.map(n => (
                <li
                  key={n.id}
                  style={n.unread ? listItemUnreadStyle : listItemStyle}
                  onClick={() => markRead("notifications", n.id)}
                >
                  {n.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Messages */}
          <div style={listContainerStyle}>
            <h3 style={listHeaderStyle}>Recent Messages</h3>
            <ul style={listStyle}>
              {messages.map(m => (
                <li
                  key={m.id}
                  style={m.unread ? listItemUnreadStyle : listItemStyle}
                  onClick={() => markRead("messages", m.id)}
                >
                  {m.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .dashboard-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
      `}</style>
    </Layout>
  );
};

// Styles
const buttonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#3b82f6",
  color: "#fff",
  fontWeight: "500",
  transition: "background 0.2s",
};

const listContainerStyle = {
  flex: "1 1 300px",
  background: "var(--bg-surface)",
  border: "1px solid var(--border-color)",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const listHeaderStyle = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "12px",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const listItemStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  background: "transparent",
  color: "var(--text-secondary)",
};

const listItemUnreadStyle = {
  ...listItemStyle,
  background: "rgba(59,130,246,.1)",
  fontWeight: "500",
};

export default Dashboard;
