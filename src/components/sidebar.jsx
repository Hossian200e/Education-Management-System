import React from "react";

const Sidebar = () => {
  return (
    <>
      <style>{`
        .sidebar {
          width: 220px;
          background: #1a73e8;
          color: #fff;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          min-height: calc(100vh - 60px); /* leave space for navbar */
        }
        .sidebar a {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 6px;
          transition: background 0.3s;
        }
        .sidebar a:hover { background: rgba(255,255,255,0.2); }
      `}</style>
      <aside className="sidebar">
        <a href="/dashboard">Dashboard</a>
        <a href="/profile">Profile</a>
        <a href="/settings">Settings</a>
        <a href="/reports">Reports</a>
      </aside>
    </>
  );
};

export default Sidebar;
