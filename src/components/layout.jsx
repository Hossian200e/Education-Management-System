import React from "react";
import Navbar from "./navbar";
import Sidebar from "../components/sidebar/sidebar";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <main style={{ padding: "20px", minHeight: "calc(100vh - 120px)" }}>
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
