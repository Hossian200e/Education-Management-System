import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ item, isActive, toggleMenu, toggleSubMenu, activeSubMenu }) => {
  const hasSubMenu = item.subMenu && item.subMenu.length > 0;

  const handleClick = () => {
    if (hasSubMenu) toggleMenu(item.key);
  };

  return (
    <li className={`dropdown ${isActive ? "open" : ""}`}>
      <div className="dropdown-label" onClick={handleClick}>
        {item.icon && <i className={`fa ${item.icon}`} />} {item.label}
        {hasSubMenu && (
          <span className="arrow">
            <i className="fa fa-chevron-right" />
          </span>
        )}
      </div>

      {hasSubMenu && isActive && (
        <ul className="submenu">
          {item.subMenu.map((sub) =>
            sub.subMenu ? (
              <MenuItem
                key={sub.key}
                item={sub}
                isActive={activeSubMenu === sub.key}
                toggleMenu={toggleSubMenu}
                toggleSubMenu={toggleSubMenu}
                activeSubMenu={activeSubMenu}
              />
            ) : sub.path ? (
              <li key={sub.key}>
                <Link to={sub.path} className="menu-link">
                  {sub.label}
                </Link>
              </li>
            ) : sub.action === "clearCache" ? (
              <li key={sub.key}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.href = "/AdminDashboard";
                  }}
                  className="menu-link"
                >
                  {sub.label}
                </a>
              </li>
            ) : null
          )}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
