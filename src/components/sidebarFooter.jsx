import React from "react";

const SidebarFooter = () => {
  return (
    <div className="sidebar-footer">
      <p>
        Powered By: <b>ABC IT</b> ©2025
      </p>

      {/* CSS included directly in JSX */}
      <style>{`
        .sidebar-footer {
          margin-top: auto; /* Push footer to the bottom */
          padding: 12px;
          text-align: center;
          font-size: 13px;
          color: #777;
          background: var(--bg, #f9f9f9); /* fallback if variable not defined */
          border-top: 1px solid var(--border, #e5e7eb);
          font-family: "Poppins", sans-serif;
          flex-shrink: 0; /* Prevent footer from shrinking */
        }

        .sidebar-footer b {
          color: #007bff;
        }

        /* Dark mode support */
        body.dark-mode .sidebar-footer {
          background: var(--bg, #2c2c2c);
          color: #eee;
          border-top: 1px solid var(--border, #333);
        }

        body.dark-mode .sidebar-footer b {
          color: #00bcd4;
        }
      `}</style>
    </div>
  );
};

export default SidebarFooter;
