import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const location = useLocation();

  // 🔁 AUTO OPEN BASED ON URL
  useEffect(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    setOpenKeys(paths);
  }, [location.pathname]);

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, openKeys, setOpenKeys }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
