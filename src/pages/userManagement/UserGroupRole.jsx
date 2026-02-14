import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/layout";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { getAllGroupsWithRoles } from "../../services/userManagement/userGroupRoleService";

const UserGroupPermissions = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserGroups = async () => {
      setLoading(true);
      const data = await getAllGroupsWithRoles(); // Fetch from API
      setUserGroups(data);
      setLoading(false);
    };
    fetchUserGroups();
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
        <span style={breadcrumbCurrent(theme)}>User Group Permissions</span>
      </div>

      {/* Card */}
      <div style={cardStyle(theme)}>
        <h2 style={headerTitle(theme)}>User Group Permissions</h2>

        {loading ? (
          <div style={emptyStateStyle(theme)}>
            <p>Loading user groups...</p>
          </div>
        ) : userGroups.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead style={theadStyle(theme)}>
                <tr>
                  <th style={thStyle(theme)}>#</th>
                  <th style={thStyle(theme)}>User Group</th>
                  <th style={thStyle(theme)}>Created By</th>
                  <th style={thStyle(theme)}>Created Time</th>
                  <th style={thStyle(theme)}>Updated By</th>
                  <th style={thStyle(theme)}>Updated Time</th>
                  <th style={thStyle(theme)}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userGroups.map((group, index) => (
                  <tr key={group.group_id} style={trStyle(theme, index)}>
                    <td style={tdStyle(theme)}>{index + 1}</td>
                    <td style={tdStyle(theme)}>{group.user_group}</td>
                    <td style={tdStyle(theme)}>{group.created_by}</td>
                    <td style={tdStyle(theme)}>{group.created_time}</td>
                    <td style={tdStyle(theme)}>{group.updated_by}</td>
                    <td style={tdStyle(theme)}>{group.updated_time}</td>
                    <td style={{ ...tdStyle(theme), display: "flex", gap: "8px" }}>
                      <button
                        onClick={() =>
                          navigate(`/user-management/user-group-role/set/${group.group_id}`)
                        }
                        style={actionButton("#16a34a")}
                      >
                        Set Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={emptyStateStyle(theme)}>
            <p>No user groups found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserGroupPermissions;

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
  minWidth: "700px",
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
  background:
    theme === "dark"
      ? i % 2 === 0
        ? "#1e293b"
        : "#243447"
      : i % 2 === 0
      ? "#ffffff"
      : "#f8fafc",
});

const actionButton = (color) => ({
  background: color,
  border: "none",
  padding: "6px 12px",
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
