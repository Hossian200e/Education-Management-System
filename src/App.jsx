import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* ===== Auth Pages ===== */
import Login from "./pages/auth/login";
import ForgetPassword from "./pages/auth/forgetPassword";

/* ===== Dashboard ===== */
import Dashboard from "./pages/dashboard/dashboard";

/* ===== User Management ===== */
import UserGroupList from "./pages/userManagement/UserGroupList";
import UserGroupView from "./pages/userManagement/UserGroupView";
import UserGroupAdd from "./pages/userManagement/UserGroupAdd";
import UserGroupEdit from "./pages/userManagement/UserGroupEdit";

const App = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: "Testimonial Panel", code: "", ordering: 0, status: "Active", createdBy: "Super Admin" },
    { id: 2, name: "Hostel Super", code: "hostel_super", ordering: 0, status: "Active", createdBy: "Admin" },
    { id: 3, name: "Higher Secondary Exam Committee", code: "higher_secondary_exam_committee", ordering: 0, status: "Active", createdBy: "Admin" },
    { id: 4, name: "Class Teacher Head", code: "class_teacher_head", ordering: 0, status: "Active", createdBy: "Admin" },
    { id: 5, name: "Super Admin", code: "super_admin", ordering: 1, status: "Active", createdBy: "Admin" },
  ]);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    localStorage.setItem("theme", theme);
    document.body.classList.toggle("dark-mode", theme === "dark");
  }, []);

  // Handlers for add/edit
  const addGroup = (group) => {
    setGroups([...groups, { ...group, id: groups.length + 1, createdBy: "Current Admin" }]);
  };

  const updateGroup = (updatedGroup) => {
    setGroups(groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)));
  };

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* User Management */}
        <Route
          path="/user-management/user-group-list"
          element={<UserGroupList groups={groups} setGroups={setGroups} />}
        />
        <Route
          path="/user-management/user-group/view/:id"
          element={<UserGroupView />}
        />
        <Route
          path="/user-management/user-group/add"
          element={<UserGroupAdd addGroup={addGroup} />}
        />
        <Route
          path="/user-management/user-group/edit/:id"
          element={<UserGroupEdit updateGroup={updateGroup} />}
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
