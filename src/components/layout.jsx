import React, { useContext } from "react";
import Navbar from "./navbar";
import Sidebar from "../components/sidebar/sidebar";
import Footer from "./footer";
import { ThemeContext } from "../context/ThemeContext";

const SIDEBAR_WIDTH = 260;
const SIDEBAR_COLLAPSED = 80;
const NAVBAR_HEIGHT = 64;
const FOOTER_HEIGHT = 48;

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Sidebar theme={theme} />
      <Navbar />

      <main
        className="app-main"
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: NAVBAR_HEIGHT,
          marginBottom: FOOTER_HEIGHT,
          padding: "24px",
          height: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)`,
          transition: "margin-left 0.3s ease, background 0.3s ease",
          background: theme==="dark"?"#111827":"#f9fafb",
          color: theme==="dark"?"#f1f5f9":"#111827",
          overflowY: "auto",
        }}
      >
        {children}
      </main>

      <Footer theme={theme} />

      <style>{`
        body.dark-mode { background: #111827; color: #f1f5f9; }
        body:not(.sidebar-collapsed) .app-main { margin-left: ${SIDEBAR_WIDTH}px; }
        body.sidebar-collapsed .app-main { margin-left: ${SIDEBAR_COLLAPSED}px; }
      `}</style>
    </>
  );
};

export default Layout;
