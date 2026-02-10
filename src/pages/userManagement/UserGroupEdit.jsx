import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";

const UserGroupEdit = ({ updateGroup }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") || "light";

  const [formData, setFormData] = useState({
    id: parseInt(id),
    name: "",
    code: "",
    ordering: 0,
    status: "Active",
  });

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const group = storedGroups.find((g) => g.id === parseInt(id));
    if (group) setFormData(group);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "ordering" ? parseInt(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGroup(formData);
    navigate("/user-management/user-group-list");
  };

  return (
    <Layout>
      <div style={cardStyle(theme)}>
        <h2 style={headerTitle(theme)}>Edit User Group</h2>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label>Title</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div style={formGroupStyle}>
            <label>Group Code</label>
            <input name="code" value={formData.code} onChange={handleChange} required />
          </div>
          <div style={formGroupStyle}>
            <label>Ordering</label>
            <input name="ordering" type="number" value={formData.ordering} onChange={handleChange} required />
          </div>
          <div style={formGroupStyle}>
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div style={{ marginTop: "16px" }}>
            <button type="submit" style={saveButtonStyle}>Update</button>
            <button type="button" onClick={() => navigate(-1)} style={cancelButtonStyle}>Cancel</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UserGroupEdit;

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
const formGroupStyle = { display: "flex", flexDirection: "column", marginBottom: "14px" };
const saveButtonStyle = { background: "#0d6efd", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "6px", cursor: "pointer", marginRight: "10px" };
const cancelButtonStyle = { background: "#6c757d", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "6px", cursor: "pointer" };
