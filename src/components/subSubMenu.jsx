import React, { useState } from "react";
import { Link } from "react-router-dom";

const SubSubMenu = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <div
        className="menu-link subsubmenu-toggle"
        onClick={() => setOpen(!open)}
      >
        {item.title} <span style={{ marginLeft: "auto" }}>{open ? "-" : "+"}</span>
      </div>

      {open && (
        <ul className="subsubmenu-list">
          {item.subMenu.map((sub, index) => (
            <li key={index}>
              <Link to={sub.path} className="menu-link">
                {sub.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .subsubmenu-toggle {
          cursor: pointer;
          padding: 8px 15px;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #555;
        }
        .subsubmenu-list {
          list-style: none;
          padding-left: 15px;
        }
      `}</style>
    </li>
  );
};

export default SubSubMenu;
