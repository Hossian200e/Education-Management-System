import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/login";
import ForgetPassword from "./pages/auth/forgetPassword";
// Dashboard
import Dashboard from "./pages/dashboard/dashboard";
// User Management
import UserGroupList from "./pages/userManagement/UserGroupList";
import UserGroupAdd from "./pages/userManagement/UserGroupAdd";
import UserGroupEdit from "./pages/userManagement/UserGroupEdit";
import UserGroupView from "./pages/userManagement/UserGroupView";

// User Group Role
import UserGroupRole from "./pages/userManagement/UserGroupRole";
import UserGroupRoleSet from "./pages/userManagement/UserGroupRoleSet";
// Theme Context
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* User Group Routes */}
          <Route path="/user-management/user-group-list" element={<UserGroupList />} />
          <Route path="/user-management/user-group/add" element={<UserGroupAdd />} />
          <Route path="/user-management/user-group/edit/:id" element={<UserGroupEdit />} />
          <Route path="/user-management/user-group/view/:id" element={<UserGroupView />} />
          {/* User Group Role Routes */}
          <Route path="/user-management/user-group-role" element={<UserGroupRole />} />
          <Route path="/user-management/user-group-role/set/:id" element={<UserGroupRoleSet />} />


          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
