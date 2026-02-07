import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import ForgetPassword from "./pages/auth/forgetPassword";
import Dashboard from "./pages/dashboard/dashboard";

const App = () => {
useEffect(() => {
  // Get stored theme, default to 'light'
  const theme = localStorage.getItem("theme") || "light";
  localStorage.setItem("theme", theme);

  // Apply dark-mode class only if theme is dark
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
