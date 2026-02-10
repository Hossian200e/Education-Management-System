import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        © 2025 Advance IT Solutions. All rights reserved.
      </footer>

      <style>{`
        .footer {
          position: fixed;
          bottom: 0;
          left: 260px;
          right: 0;
          height: 48px;
          background: #f5f5f5;
          border-top: 1px solid #ddd;
          font-size: 13px;
          color: #555;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          transition: left 0.3s;
        }

        body.sidebar-collapsed .footer {
          left: 70px;
        }

        body.dark-mode .footer {
          background: #0f172a;
          color: #ccc;
          border-top-color: #374151;
        }
      `}</style>
    </>
  );
};

export default Footer;
