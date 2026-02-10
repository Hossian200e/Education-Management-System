import React from "react";
import Navbar from "./navbar";
import Sidebar from "../components/sidebar/sidebar";
import Footer from "./footer";

const SIDEBAR_WIDTH = 260;
const SIDEBAR_COLLAPSED = 80;
const NAVBAR_HEIGHT = 64;
const FOOTER_HEIGHT = 48;

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Navbar />

      <main
        className="app-main"
        style={{
          marginTop: NAVBAR_HEIGHT,
          marginBottom: FOOTER_HEIGHT,
          padding: "20px",
          height: `calc(100vh - ${NAVBAR_HEIGHT + FOOTER_HEIGHT}px)`,
          overflowY: "auto",
          background: "var(--bg-surface)",
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </main>

      <Footer />

      <style>{`
        :root {
          --bg-surface: #f9fafb;
        }

        body.dark-mode {
          --bg-surface: #111827;
        }

        body:not(.sidebar-collapsed) .app-main {
          margin-left: ${SIDEBAR_WIDTH}px;
        }

        body.sidebar-collapsed .app-main {
          margin-left: ${SIDEBAR_COLLAPSED}px;
        }
      `}</style>
    </>
  );
};

export default Layout;
