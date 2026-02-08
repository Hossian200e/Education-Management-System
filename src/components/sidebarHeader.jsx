import React from "react";

const defaultLogo = "https://via.placeholder.com/100x100.png?text=Logo";

const SidebarHeader = () => {
  const instituteName = localStorage.getItem("institute_name_en") || "Institute Name";

  return (
    <>
      <div className="sidebar-header">
        <img src={defaultLogo} className="sidebar-logo" alt="Institute Logo" />
        <h3>{instituteName}</h3>
      </div>

      {/* CSS included directly in JSX */}
      <style>{`
        :root {
          --sidebar-bg: #ffffff;
          --text: #333;
          --border: #e5e7eb;
          --bg: #f9f9f9;
        }

        .sidebar-header {
          padding: 15px;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }

        .sidebar-header img {
          width: 55px;
          height: 55px;
          margin-bottom: 8px;
        }

        .sidebar-header h3 {
          font-size: 14px;
          color: var(--text);
          margin: 0;
        }

        /* Dark mode support */
        body.dark-mode {
          --sidebar-bg: #1e1e1e;
          --text: #eee;
          --border: #333;
          --bg: #2c2c2c;
        }
      `}</style>
    </>
  );
};

export default SidebarHeader;
