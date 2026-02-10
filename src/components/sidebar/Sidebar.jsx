import React, { useState, useEffect } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("sidebar-collapsed", collapsed);
  }, [collapsed]);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "›" : "‹"}
      </div>

      <SidebarHeader collapsed={collapsed} />
      <SidebarMenu collapsed={collapsed} />
      <SidebarFooter collapsed={collapsed} />

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 260px;
          background: var(--sidebar-bg);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          z-index: 1001;
          transition: width 0.3s;
        }

        .sidebar.collapsed {
          width: 70px;
        }

        .sidebar-toggle {
          position: absolute;
          top: 16px;
          right: -12px;
          width: 28px;
          height: 28px;
          background: #2563eb;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          z-index: 10;
        }

        :root {
          --sidebar-bg: #ffffff;
          --border: #e5e7eb;
        }

        body.dark-mode {
          --sidebar-bg: #111827;
          --border: #374151;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
