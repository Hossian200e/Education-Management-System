import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/layout";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

const UserGroupRoleSet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const [group, setGroup] = useState(null);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // 🔥 Hardcoded Groups (same as previous page)
    const groups = [
      { id: "1", name: "ADMIN" },
      { id: "2", name: "TEACHER" },
      { id: "3", name: "STUDENT" },
    ];

    const selectedGroup = groups.find((g) => g.id === id);
    setGroup(selectedGroup);

    // 🔥 Hardcoded Modules
    const modules = [
      "Dashboard",
      "User Management",
      "Student Management",
      "Teacher Management",
      "Class Management",
      "Exam Management",
    ];

    const defaultPermissions = modules.map((module) => ({
      module,
      view: false,
      add: false,
      edit: false,
      delete: false,
    }));

    setPermissions(defaultPermissions);
  }, [id]);

  const handleChange = (index, field) => {
    const updated = [...permissions];
    updated[index][field] = !updated[index][field];
    setPermissions(updated);
  };

  const handleSave = () => {
    console.log("Saved Permissions:", {
      group,
      permissions,
    });
    alert("Permissions Saved Successfully!");
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div style={breadcrumbContainer(theme)}>
        <FaHome />
        <span
          style={breadcrumbLink(theme)}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </span>
        <FaChevronRight style={{ fontSize: "12px" }} />
        <span
          style={breadcrumbLink(theme)}
          onClick={() => navigate("/user-management/user-group-role")}
        >
          User Group Permissions
        </span>
        <FaChevronRight style={{ fontSize: "12px" }} />
        <span style={breadcrumbCurrent(theme)}>Set Role</span>
      </div>

      <div style={cardStyle(theme)}>
        <h2 style={headerTitle(theme)}>
          Set Permissions for:{" "}
          <span style={{ color: "#16a34a" }}>
            {group ? group.name : "Loading..."}
          </span>
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead style={theadStyle(theme)}>
              <tr>
                <th style={thStyle(theme)}>Module</th>
                <th style={thStyle(theme)}>View</th>
                <th style={thStyle(theme)}>Add</th>
                <th style={thStyle(theme)}>Edit</th>
                <th style={thStyle(theme)}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((item, index) => (
                <tr key={index} style={trStyle(theme, index)}>
                  <td style={tdStyle(theme)}>{item.module}</td>
                  {["view", "add", "edit", "delete"].map((field) => (
                    <td key={field} style={tdStyle(theme)}>
                      <input
                        type="checkbox"
                        checked={item[field]}
                        onChange={() => handleChange(index, field)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button
            onClick={handleSave}
            style={{
              background: "#16a34a",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Save Permissions
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UserGroupRoleSet;

/* ===== Styles ===== */

const breadcrumbContainer = (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "20px",
  flexWrap: "wrap",
  color: theme === "dark" ? "#cbd5e1" : "#64748b",
});

const breadcrumbLink = (theme) => ({
  cursor: "pointer",
  fontWeight: 500,
  color: theme === "dark" ? "#38bdf8" : "#2563eb",
});

const breadcrumbCurrent = (theme) => ({
  fontWeight: 600,
  color: theme === "dark" ? "#f1f5f9" : "#0f172a",
});

const cardStyle = (theme) => ({
  background: theme === "dark" ? "#1e293b" : "#ffffff",
  borderRadius: "12px",
  padding: "24px",
  boxShadow:
    theme === "dark"
      ? "0 4px 20px rgba(0,0,0,0.4)"
      : "0 4px 16px rgba(0,0,0,0.06)",
});

const headerTitle = (theme) => ({
  fontSize: "20px",
  fontWeight: 600,
  color: theme === "dark" ? "#f8fafc" : "#0f172a",
  marginBottom: "20px",
});

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "600px",
};

const theadStyle = (theme) => ({
  background: theme === "dark" ? "#334155" : "#f1f5f9",
});

const thStyle = (theme) => ({
  padding: "12px",
  textAlign: "center",
  borderBottom: `1px solid ${theme === "dark" ? "#475569" : "#e2e8f0"}`,
  color: theme === "dark" ? "#e2e8f0" : "#1e293b",
});

const tdStyle = (theme) => ({
  padding: "12px",
  textAlign: "center",
  borderBottom: `1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`,
  color: theme === "dark" ? "#f1f5f9" : "#1e293b",
});

const trStyle = (theme, i) => ({
  background:
    theme === "dark"
      ? i % 2 === 0
        ? "#1e293b"
        : "#243447"
      : i % 2 === 0
      ? "#ffffff"
      : "#f8fafc",
});
