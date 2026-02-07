import React from "react";

const Footer = () => {
  return (
    <>
      <style>{`
        .footer {
          background: #f5f5f5;
          padding: 12px 20px;
          text-align: center;
          border-top: 1px solid #ddd;
          font-size: 14px;
          color: #555;
        }
        body.dark-mode .footer {
          background: #0f172a;
          color: #ccc;
          border-top-color: #444;
        }
      `}</style>
      <footer className="footer">
        © 2024 Advance IT Solutions. All rights reserved.
      </footer>
    </>
  );
};

export default Footer;
