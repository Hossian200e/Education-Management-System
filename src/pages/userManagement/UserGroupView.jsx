import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import Layout from "../../components/layout";

const UserGroupView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") || "light";
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const foundGroup = storedGroups.find((g) => g.id === parseInt(id));
    setGroup(foundGroup);
  }, [id]);

  if (!group)
    return (
      <Layout>
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          User Group not found
        </p>
      </Layout>
    );

  return (
    <Layout>
      {/* ===== Breadcrumb ===== */}
      <div style={breadcrumbContainer(theme)}>
        <FaHome />
        <span onClick={() => navigate("/dashboard")} style={breadcrumbLink(theme)}>
          Dashboard
        </span>
        <FaChevronRight />
        <span
          onClick={() => navigate("/user-management/user-group-list")}
          style={breadcrumbLink(theme)}
        >
          User Groups
        </span>
        <FaChevronRight />
        <span style={breadcrumbCurrent(theme)}>View</span>
      </div>

      {/* ===== Card ===== */}
      <div style={cardStyle(theme)}>
        <div style={cardHeader(theme)}>View User Group</div>

        <div style={infoContainer}>
          <InfoRow label="Title (En)" value={group.titleEn || "-"} />
          <InfoRow label="Title" value={group.name || "-"} />
          <InfoRow label="Group Code" value={group.code || "-"} />
          <InfoRow label="Ordering" value={group.ordering || "-"} />
          <InfoRow label="Created By" value={group.createdBy || "Admin"} />
          <InfoRow
            label="Status"
            value={
              <span
                style={{
                  ...statusBadge,
                  background: group.status ? "#16a34a" : "#dc2626",
                }}
              >
                {group.status ? "Active" : "Inactive"}
              </span>
            }
          />
          <InfoRow
            label="Created Date"
            value={new Date(group.id).toLocaleString()}
          />
          <InfoRow
            label="Last Updated"
            value={
              group.updatedAt
                ? new Date(group.updatedAt).toLocaleString()
                : "Not Updated"
            }
          />
          <InfoRow
            label="Notes"
            value={group.notes || "No additional notes"}
          />
        </div>

        {/* Back Button */}
        <div style={buttonContainer}>
          <button onClick={() => navigate(-1)} style={backButtonStyle}>
            Back
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UserGroupView;

/* ===== Reusable Info Row ===== */
const InfoRow = ({ label, value }) => (
  <div style={infoRow}>
    <span style={{ fontWeight: 500 }}>{label}</span>
    <span>{value}</span>
  </div>
);

/* ================= STYLES ================= */

const breadcrumbContainer = (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "30px",
  color: theme === "dark" ? "#cbd5e1" : "#64748b",
});

const breadcrumbLink = (theme) => ({
  cursor: "pointer",
  fontWeight: 500,
  color: theme === "dark" ? "#38bdf8" : "#2563eb",
});

const breadcrumbCurrent = (theme) => ({
  fontWeight: 600,
  color: theme === "dark" ? "#f8fafc" : "#0f172a",
});

const cardStyle = (theme) => ({
  width: "100%",
  maxWidth: "700px",
  margin: "0 auto",
  borderRadius: "16px",
  overflow: "hidden",
  background: theme === "dark" ? "#1e293b" : "#ffffff",
  boxShadow:
    theme === "dark"
      ? "0 8px 30px rgba(0,0,0,0.4)"
      : "0 8px 25px rgba(0,0,0,0.08)",
});

const cardHeader = (theme) => ({
  padding: "20px",
  borderBottom: `1px solid ${theme === "dark" ? "#334155" : "#e5e7eb"}`,
  textAlign: "center",
  fontWeight: 600,
  fontSize: "18px",
  color: theme === "dark" ? "#f8fafc" : "#0f172a",
});

const infoContainer = {
  padding: "25px 30px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "14px",
};

const statusBadge = {
  padding: "5px 12px",
  borderRadius: "20px",
  color: "#fff",
  fontSize: "12px",
  fontWeight: 500,
};

const buttonContainer = {
  padding: "20px 30px",
  display: "flex",
  justifyContent: "flex-end",
};

const backButtonStyle = {
  background: "#ef4444",
  color: "#ffffff",
  padding: "10px 24px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
};
