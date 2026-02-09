import React from "react";

const SidebarHeader = ({ collapsed }) => {
  const instituteName = localStorage.getItem("institute_name_en") || "Institute Name";

  return (
    <div className="sidebar-header">
      <img src="https://via.placeholder.com/60x60.png?text=Logo" alt="Logo" />
      {!collapsed && <h3>{instituteName}</h3>}

      <style>{`
        .sidebar-header {
          padding: 15px;
          text-align: center;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sidebar-header img {
          width: 40px;
          height: 40px;
        }

        .sidebar-header h3 {
          font-size: 14px;
          margin-top: 6px;
          color: #333;
          transition: opacity 0.3s;
        }

        .sidebar.collapsed .sidebar-header h3 {
          opacity: 0;
        }

        body.dark-mode .sidebar-header h3 {
          color: #eee;
        }
      `}</style>
    </div>
  );
};

export default SidebarHeader;
