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
              <i className={`fa fa-chevron-right arrow ${isOpen ? "rotated" : ""}`} />
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
        }

        .menu-label, a {
          display: flex;
          align-items: center;
          padding: ${10 + (level - 1) * 4}px 16px;
          margin-bottom: 6px;
          border-radius: 8px;
          text-decoration: none;
          cursor: pointer;
          font-size: ${14 - (level - 1)}px;
          transition: all 0.25s ease;
          color: var(--text);
        }

        .menu-label:hover, a:hover {
          background: var(--hover);
          color: var(--accent);
        }

        .menu-item.level-1:not(.has-submenu) > a .label-left {
          gap: ${gap}px;
        }

        .label-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .submenu {
          max-height: 0;
          overflow: hidden;
          padding-left: ${level * 20}px;
          transition: max-height 0.35s ease;
        }

        .submenu.open {
          max-height: 2000px;
        }

        .arrow {
          margin-left: auto;
          font-size: 12px;
          transition: transform 0.3s;
        }

        .arrow.rotated {
          transform: rotate(90deg);
        }

        .active {
          background: var(--active-bg);
          color: var(--accent);
        }

        /* ---------- THEME VARIABLES ---------- */
        :root {
          --text: #1f2937;
          --hover: #f3f4f6;
          --accent: #2563eb;
          --active-bg: #e0f2fe;
        }

        body.dark-mode {
          --text: #e5e7eb;
          --hover: #374151;
          --accent: #60a5fa;
          --active-bg: #1e3a8a;
        }
      `}</style>
    </div>
  );
};

export default SidebarItem;
