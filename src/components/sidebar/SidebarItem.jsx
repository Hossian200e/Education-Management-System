import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ item, collapsed, level, openKeys, setOpenKeys, dot }) => {
  const location = useLocation();
  const isOpen = openKeys[level] === item.key;
  const hasSubmenu = !!item.subMenu;

  const toggle = () => {
    if (!hasSubmenu) return;
    setOpenKeys(prev => {
      const newKeys = { ...prev };
      if (isOpen) delete newKeys[level];
      else newKeys[level] = item.key;
      Object.keys(newKeys).forEach(k => Number(k) > level && delete newKeys[k]);
      return newKeys;
    });
  };

  const isActive = path => location.pathname === path;

  // Dynamic icon-text gap: only for top-level single-level menus
  const gap = !hasSubmenu && level === 1 ? item.iconGap ?? 12 : 8;

  return (
    <div className={`menu-item level-${level} ${isOpen ? "open" : ""} ${hasSubmenu ? "has-submenu" : ""}`}>
      {hasSubmenu ? (
        <>
          <div className={`menu-label level-${level}`} onClick={toggle}>
            <div className="label-left">
              {item.icon && <i className={item.icon} />}
              {!collapsed && <span>{dot} {item.title}</span>}
            </div>
            {!collapsed && (
              <i
                className={`fa fa-chevron-right arrow ${isOpen ? "rotated" : ""}`}
              />
            )}
          </div>
          <div className={`submenu ${isOpen ? "open" : ""}`}>
            {item.subMenu.map(sub => (
              <SidebarItem
                key={sub.key}
                item={sub}
                collapsed={collapsed}
                level={level + 1}
                openKeys={openKeys}
                setOpenKeys={setOpenKeys}
                dot={dot + "."}
              />
            ))}
          </div>
        </>
      ) : (
        <Link to={item.path} className={isActive(item.path) ? "active" : ""}>
          <div className="label-left">
            {item.icon && <i className={item.icon} />}
            {!collapsed && <span>{dot} {item.title}</span>}
          </div>
        </Link>
      )}

      <style>{`
        .menu-item {
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
        }

        .menu-label, a {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: ${10 + (level - 1) * 4}px 16px;
          margin-bottom: 6px;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          color: #1f2937;
          font-size: ${14 - (level - 1)}px;
          font-weight: 500;
          transition: all 0.3s ease;
          user-select: none;
        }

        .menu-label:hover, a:hover {
          background-color: #f3f4f6;
          color: #2563eb;
        }

        /* Top-level single-level menu icon-text spacing */
        .menu-item.level-1:not(.has-submenu) > .menu-label .label-left,
        .menu-item.level-1:not(.has-submenu) > a .label-left {
          gap: ${gap}px;
        }

        .submenu {
          display: flex;
          flex-direction: column;
          padding-left: ${level * 20}px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.35s ease;
        }

        .submenu.open {
          max-height: 2000px;
        }

        .arrow {
          font-size: 12px;
          color: #6b7280;
          margin-left: auto; /* always push arrow to far right */
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .arrow.rotated {
          transform: rotate(90deg);
        }

        .label-left {
          display: flex;
          align-items: center;
        }

        .sidebar-menu.collapsed .menu-label span,
        .sidebar-menu.collapsed a span {
          display: none;
        }

        .sidebar-menu.collapsed .menu-label,
        .sidebar-menu.collapsed a {
          justify-content: center;
          padding: 10px 0;
        }

        .active {
          background-color: #e0f2fe;
          color: #0284c7;
        }

        /* Smooth transition for nested menus */
        .submenu .menu-item .submenu {
          padding-left: ${level * 20}px;
        }
      `}</style>
    </div>
  );
};

export default SidebarItem;
