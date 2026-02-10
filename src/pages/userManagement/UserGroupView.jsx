import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  if (!group) return <Layout><p style={{ textAlign: "center", marginTop: "50px" }}>User Group not found</p></Layout>;

  return (
    <Layout>
      <div style={cardStyle(theme)}>
        <h2 style={headerTitle(theme)}>View User Group</h2>
        <p><strong>Title:</strong> {group.name}</p>
        <p><strong>Group Code:</strong> {group.code}</p>
        <p><strong>Created By:</strong> {group.createdBy}</p>
        <p><strong>Ordering:</strong> {group.ordering}</p>
        <p><strong>Status:</strong> {group.status}</p>
        <button onClick={() => navigate(-1)} style={cancelButtonStyle}>Back</button>
      </div>
    </Layout>
  );
};

export default UserGroupView;

/* ===== Styles ===== */
const cardStyle = (theme) => ({
  background: theme === "dark" ? "#1e293b" : "#fff",
  borderRadius: "10px",
  padding: "20px",
  maxWidth: "500px",
  margin: "20px auto",
  boxShadow: theme === "dark" ? "0 2px 15px rgba(0,0,0,0.7)" : "0 2px 12px rgba(0,0,0,0.1)",
});
const headerTitle = (theme) => ({
  fontSize: "1.5rem",
  color: theme === "dark" ? "#f8fafc" : "#111827",
  marginBottom: "20px",
});
const cancelButtonStyle = { background: "#6c757d", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "6px", cursor: "pointer", marginTop: "20px" };
