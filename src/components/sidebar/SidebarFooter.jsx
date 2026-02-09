import React from "react";

const SidebarFooter = ({ collapsed }) => {
  return (
    <div className="sidebar-footer">
      {!collapsed && <>Powered By <b>ABC IT</b> ©2025</>}

      <style>{`
        .sidebar-footer {
          padding: 12px;
          text-align: center;
          font-size: 13px;
          color: #777;
          border-top: 1px solid #e5e7eb;
          background: #f9f9f9;
          transition: opacity 0.3s;
        }

        .sidebar-footer b {
          color: #1d4ed8;
        }

        .sidebar.collapsed .sidebar-footer {
          opacity: 0;
        }

        body.dark-mode .sidebar-footer {
          background: #111827;
          color: #eee;
        }

        body.dark-mode .sidebar-footer b {
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default SidebarFooter;
