import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
        <i className={`fa ${collapsed ? "fa-angle-right" : "fa-angle-left"}`} />
      </div>

      <SidebarHeader collapsed={collapsed} />
      <SidebarMenu collapsed={collapsed} />
      <SidebarFooter collapsed={collapsed} />

      <style>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background: #fff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
          position: relative;
          font-family: "Poppins", sans-serif;
        }
        .sidebar.collapsed { width: 70px; }
        .sidebar-toggle {
          position: absolute;
          top: 15px;
          right: -12px;
          width: 28px;
          height: 28px;
          background: #1d4ed8;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: transform 0.3s;
        }
        .sidebar.collapsed .sidebar-toggle { transform: rotate(180deg); }
        body.dark-mode .sidebar { background: #1f2937; border-color: #374151; color: #fff; }
      `}</style>
    </aside>
  );
};

export default Sidebar;
