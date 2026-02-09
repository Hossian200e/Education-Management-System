import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "./SidebarContext";

const MenuItem = ({ item, level = 0, role }) => {
  const { openKeys, setOpenKeys, collapsed } = useSidebar();
  const location = useLocation();
  const ref = useRef(null);

  if (item.roles && !item.roles.includes(role)) return null;

  const key = item.path || item.title;
  const isOpen = openKeys.includes(key);
  const isActive = location.pathname === item.path;

  const toggle = () => {
    setOpenKeys((prev) =>
      isOpen ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className={`menu-item level-${level}`}>
      <div className="menu-label" onClick={item.children ? toggle : null}>
        <div className="left">
          {item.icon && <i className={item.icon} />}
          {!collapsed && (
            item.path ? (
              <Link to={item.path} className={isActive ? "active" : ""}>
                {item.title}
              </Link>
            ) : (
              <span>{item.title}</span>
            )
          )}
        </div>
        {item.children && !collapsed && (
          <i className={`fa fa-chevron-right arrow ${isOpen ? "open" : ""}`} />
        )}
      </div>

      {item.children && (
        <div
          ref={ref}
          className="submenu"
          style={{
            maxHeight: isOpen ? ref.current?.scrollHeight : 0
          }}
        >
          {item.children.map((child, i) => (
            <MenuItem key={i} item={child} level={level + 1} role={role} />
          ))}
        </div>
      )}

      <style>{`
        .menu-label {
          display:flex;
          justify-content:space-between;
          padding:10px;
          border-radius:8px;
          cursor:pointer;
        }
        .menu-label:hover { background:var(--hover-bg); }
        .submenu {
          overflow:hidden;
          transition:max-height .3s ease;
          padding-left:16px;
        }
        .arrow.open { transform:rotate(90deg); }
        .active {
          color:white;
          background:var(--active-bg);
          padding:4px 8px;
          border-radius:6px;
        }
      `}</style>
    </div>
  );
};

export default MenuItem;
