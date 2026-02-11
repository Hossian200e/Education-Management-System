import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/auth/login";
import ForgetPassword from "./pages/auth/forgetPassword";
import Dashboard from "./pages/dashboard/dashboard";

import UserGroupList from "./pages/userManagement/UserGroupList";
import UserGroupAdd from "./pages/userManagement/UserGroupAdd";
import UserGroupEdit from "./pages/userManagement/UserGroupEdit";
import UserGroupView from "./pages/userManagement/UserGroupView";

// Theme Context
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/user-management/user-group-list" element={<UserGroupList />} />
          <Route path="/user-management/user-group/add" element={<UserGroupAdd />} />
          <Route path="/user-management/user-group/edit/:id" element={<UserGroupEdit />} />
          <Route path="/user-management/user-group/view/:id" element={<UserGroupView />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
