import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* You can add more routes here */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
