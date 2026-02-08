import React from "react";

import SidebarHeader from "./sidebarHeader";
import SidebarMenu from "./sidebarMenu";
import SidebarFooter from "./sidebarFooter";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <SidebarHeader />
      <SidebarMenu />
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
