import React from "react";
import Layout from "../../components/layout";
import { FaEye, FaEdit, FaChevronRight, FaHome, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserGroupList = ({ groups }) => {
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") || "light";

  return (
    <Layout>
      {/* Breadcrumb */}
      <div style={breadcrumbContainer(theme)}>
        <FaHome style={{ marginRight: "0.5rem" }} />
        <span style={breadcrumbLink(theme)} onClick={() => navigate("/dashboard")}>
          Dashboard
        </span>
        <FaChevronRight style={{ margin: "0 0.5rem", fontSize: "0.75rem" }} />
        <span style={breadcrumbCurrent(theme)}>User Group List</span>
      </div>

      {/* Card */}
      <div style={cardStyle(theme)}>
        <div style={cardHeader}>
          <h2 style={headerTitle(theme)}>User Group List</h2>
<button
  onClick={() => navigate("/user-management/user-group/add")}
  style={addButtonStyle}
>
  <FaPlus /> New User Group
</button>

        </div>

        {/* Responsive Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle} className="thin-scrollbar">
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
                  <td style={{ ...tdStyle(theme), display: "flex", gap: "0.5rem" }}>
                    <button
                      style={actionButton(theme, "#0dcaf0")}
                      onClick={() =>
                        navigate(`/user-management/user-group/view/${group.id}`)
                      }
                    >
                      <FaEye />
                    </button>
                    <button
                      style={actionButton(theme, "#fd7e14")}
                      onClick={() =>
                        navigate(`/user-management/user-group/edit/${group.id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scrollbar & Hover Styles */}
      <style>
        {`
          .thin-scrollbar::-webkit-scrollbar {
            width: 6px; height: 6px;
          }
          .thin-scrollbar::-webkit-scrollbar-thumb {
            background: ${theme === "dark" ? "rgba(156,163,175,0.6)" : "rgba(107,114,128,0.5)"};
            border-radius: 3px;
          }
          .thin-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          table tr:hover {
            transform: translateY(-2px);
            transition: all 0.3s ease;
            background: ${theme === "dark" ? "#374151" : "#e2e8f0"};
          }
        `}
      </style>
    </Layout>
  );
};

export default UserGroupList;

/* ================= STYLES ================= */
const breadcrumbContainer = (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "16px",
  color: theme === "dark" ? "#cbd5e1" : "#6c757d",
});
const breadcrumbLink = (theme) => ({
  cursor: "pointer",
  fontWeight: 500,
  color: theme === "dark" ? "#60a5fa" : "#0d6efd",
});
const breadcrumbCurrent = (theme) => ({
  fontWeight: 600,
  color: theme === "dark" ? "#f3f4f6" : "#111827",
});
const cardStyle = (theme) => ({
  background: theme === "dark" ? "#1e293b" : "#fff",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: theme === "dark"
    ? "0 2px 15px rgba(0,0,0,0.7)"
    : "0 2px 12px rgba(0,0,0,0.1)",
});
const cardHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" };
const addButtonStyle = {
  background: "linear-gradient(90deg, #198754, #20c997)",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontWeight: 500,
  transition: "all 0.3s ease",
};
const headerTitle = (theme) => ({ fontSize: "1.5rem", color: theme === "dark" ? "#f8fafc" : "#111827", fontWeight: 600 });
const tableStyle = { width: "100%", borderCollapse: "collapse", minWidth: "600px" };
const theadStyle = (theme) => ({
  position: "sticky",
  top: 0,
  zIndex: 5,
  background: theme === "dark"
    ? "linear-gradient(90deg, #1f2937 0%, #111827 100%)"
    : "linear-gradient(90deg, #e9ecef 0%, #f8f9fa 100%)",
});
const thStyle = (theme) => ({
  padding: "0.75rem 1rem",
  textAlign: "left",
  borderBottom: `1px solid ${theme === "dark" ? "#374151" : "#dee2e6"}`,
  fontWeight: 600,
  color: theme === "dark" ? "#e5e7eb" : "#111827",
  whiteSpace: "nowrap",
});
const tdStyle = (theme) => ({
  padding: "0.75rem 1rem",
  borderBottom: `1px solid ${theme === "dark" ? "#374151" : "#dee2e6"}`,
  color: theme === "dark" ? "#e5e7eb" : "#111827",
  whiteSpace: "nowrap",
});
const trStyle = (theme, i) => ({
  background: theme === "dark"
    ? i % 2 === 0 ? "#1f2937" : "#273449"
    : i % 2 === 0 ? "#ffffff" : "#f9fafb",
  transition: "all 0.3s ease",
  cursor: "default",
});
const actionButton = (theme, color) => ({
  background: color,
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "6px 12px",
  cursor: "pointer",
  transition: "all 0.3s ease",
});
