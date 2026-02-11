import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/layout";
import { FaEye, FaEdit, FaChevronRight, FaHome, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const UserGroupList = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [groups, setGroups] = useState([]);

  // Load groups from localStorage
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(storedGroups);
  }, []);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div style={breadcrumbContainer(theme)}>
        <FaHome />
        <span style={breadcrumbLink(theme)} onClick={() => navigate("/dashboard")}>
          Dashboard
        </span>
        <FaChevronRight style={{ fontSize: "12px" }} />
        <span style={breadcrumbCurrent(theme)}>User Group List</span>
      </div>

      {/* Card */}
      <div style={cardStyle(theme)}>
        <div style={cardHeader}>
          <h2 style={headerTitle(theme)}>User Group List</h2>
          <button
            style={addButtonStyle}
            onClick={() => navigate("/user-management/user-group/add")}
          >
            <FaPlus /> New User Group
          </button>
        </div>

        {/* Table */}
        {groups.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead style={theadStyle(theme)}>
                <tr>
                  <th style={thStyle(theme)}>#</th>
                  <th style={thStyle(theme)}>Title</th>
                  <th style={thStyle(theme)}>Group Code</th>
                  <th style={thStyle(theme)}>Ordering</th>
                  <th style={thStyle(theme)}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, index) => (
                  <tr key={group.id} style={trStyle(theme, index)}>
                    <td style={tdStyle(theme)}>{index + 1}</td>
                    <td style={tdStyle(theme)}>{group.name}</td>
                    <td style={tdStyle(theme)}>{group.code}</td>
                    <td style={tdStyle(theme)}>{group.ordering}</td>
                    <td style={{ ...tdStyle(theme), display: "flex", gap: "8px" }}>
                      <button
                        onClick={() =>
                          navigate(`/user-management/user-group/view/${group.id}`)
                        }
                        style={actionButton("#0ea5e9")}
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/user-management/user-group/edit/${group.id}`)
                        }
                        style={actionButton("#f59e0b")}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={emptyStateStyle(theme)}>
            <p>No user groups created yet.</p>
            <button
              style={addButtonStyle}
              onClick={() => navigate("/user-management/user-group/add")}
            >
              <FaPlus /> Create Your First Group
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserGroupList;

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
  boxShadow: theme === "dark" ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.06)",
});

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  flexWrap: "wrap",
};

const headerTitle = (theme) => ({
  fontSize: "20px",
  fontWeight: 600,
  color: theme === "dark" ? "#f8fafc" : "#0f172a",
});

const addButtonStyle = {
  background: "linear-gradient(90deg,#16a34a,#22c55e)",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontWeight: 500,
};

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
  textAlign: "left",
  borderBottom: `1px solid ${theme === "dark" ? "#475569" : "#e2e8f0"}`,
  color: theme === "dark" ? "#e2e8f0" : "#1e293b",
});

const tdStyle = (theme) => ({
  padding: "12px",
  borderBottom: `1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`,
  color: theme === "dark" ? "#f1f5f9" : "#1e293b",
});

const trStyle = (theme, i) => ({
  background: theme === "dark" ? (i % 2 === 0 ? "#1e293b" : "#243447") : i % 2 === 0 ? "#ffffff" : "#f8fafc",
});

const actionButton = (color) => ({
  background: color,
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const emptyStateStyle = (theme) => ({
  textAlign: "center",
  padding: "50px 0",
  color: theme === "dark" ? "#cbd5e1" : "#64748b",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
});
