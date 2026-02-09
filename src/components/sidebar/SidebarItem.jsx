import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ item, collapsed, level, openKeys, setOpenKeys, dot }) => {
  const location = useLocation();
  const isOpen = openKeys[level] === item.key;

  const toggle = () => {
    setOpenKeys(prev => {
      const newKeys = { ...prev };
      if (isOpen) delete newKeys[level];
      else newKeys[level] = item.key;
      Object.keys(newKeys).forEach(k => Number(k) > level && delete newKeys[k]);
      return newKeys;
    });
  };

  const isActive = path => location.pathname === path;

  return (
    <div className={`menu-item ${isOpen ? "open" : ""}`}>
      {item.subMenu ? (
        <>
          <div className={`menu-label level-${level}`} onClick={toggle}>
            <div className="label-left">
              {item.icon && level === 1 && <i className={item.icon} />}
              {!collapsed && <span>{dot} {item.title}</span>}
            </div>
            {!collapsed && <i className="fa fa-chevron-right arrow" />}
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
          {item.icon && level === 1 && <i className={item.icon} />}
          {!collapsed && <span>{dot}. {item.title}</span>}
        </Link>
      )}

      <style>{`
        .menu-item { display: flex; flex-direction: column; }
        .menu-label, a {
          display: flex; align-items: center; justify-content: space-between;
          padding: ${10 - (level - 1)}px 12px; margin-bottom: 4px; border-radius: 8px;
          cursor: pointer; text-decoration: none; color: #1f2937;
          font-size: ${14 - (level - 1)}px; font-weight: 500; transition: all 0.3s;
        }
        .menu-label:hover, a:hover { background: #f3f4f6; color: #60a5fa; }
        .submenu {
          display: flex; flex-direction: column; padding-left: ${level * 16}px;
          max-height: 0; overflow: hidden; transition: max-height 0.3s ease;
        }
        .submenu.open { max-height: 2000px; /* large enough to show all children */ }
        .arrow { font-size: 12px; transition: transform 0.3s; color: #6b7280; }
        .menu-item.open > .menu-label .arrow { transform: rotate(90deg); }
        .label-left { display: flex; align-items: center; gap: 12px; }
        .sidebar-menu.collapsed .menu-label span, .sidebar-menu.collapsed a span { display: none; }
        .sidebar-menu.collapsed .menu-label, .sidebar-menu.collapsed a { justify-content: center; padding: 10px 0; }
      `}</style>
    </div>
  );
};

export default SidebarItem;
