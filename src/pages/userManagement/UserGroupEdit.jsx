import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import Layout from "../../components/layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserGroupEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") || "light";

  const [formData, setFormData] = useState({
    id: parseInt(id),
    titleEn: "",
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
    setFormData({
      ...formData,
      [name]: name === "ordering" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate code (no spaces)
    if (formData.code.includes(" ")) {
      toast.error("Group code cannot contain spaces.", {
        position: "top-right",
        autoClose: 3000,
        theme: theme === "dark" ? "dark" : "light",
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Check duplicate code
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const duplicate = storedGroups.find(
      (g) => g.code.toLowerCase() === formData.code.toLowerCase() && g.id !== formData.id
    );

    if (duplicate) {
      toast.error("Group code already exists. Use a unique code.", {
        position: "top-right",
        autoClose: 3000,
        theme: theme === "dark" ? "dark" : "light",
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const updatedGroups = storedGroups.map((g) =>
      g.id === formData.id ? formData : g
    );

    localStorage.setItem("groups", JSON.stringify(updatedGroups));

    toast.success("User Group updated successfully!", {
      position: "top-right",
      autoClose: 2000,
      theme: theme === "dark" ? "dark" : "light",
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(() => navigate("/user-management/user-group-list"), 1500);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
        style={{ zIndex: 9999 }}
      />
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
          <span style={breadcrumbCurrent(theme)}>Edit</span>
        </div>

        {/* ===== Center Card ===== */}
        <div style={pageWrapper}>
          <div style={cardStyle(theme)}>
            <div style={cardHeader(theme)}>Edit User Group</div>
            <form onSubmit={handleSubmit} style={formStyle}>
              {/* Title (En) */}
              <div style={fieldGroup}>
                <label style={labelStyle(theme)}>
                  Title (En) <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  name="titleEn"
                  value={formData.titleEn}
                  onChange={handleChange}
                  required
                  style={inputStyle(theme)}
                  placeholder="Enter English title"
                />
              </div>

              {/* Title */}
              <div style={fieldGroup}>
                <label style={labelStyle(theme)}>
                  Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle(theme)}
                  placeholder="Enter group title"
                />
              </div>

              {/* Group Code */}
              <div style={fieldGroup}>
                <label style={labelStyle(theme)}>
                  Group Code <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  style={inputStyle(theme)}
                  placeholder="Enter unique code (no spaces)"
                />
              </div>

              {/* Ordering */}
              <div style={fieldGroup}>
                <label style={labelStyle(theme)}>Ordering</label>
                <input
                  name="ordering"
                  type="number"
                  value={formData.ordering}
                  onChange={handleChange}
                  style={inputStyle(theme)}
                  placeholder="Enter display order"
                />
              </div>

              {/* Status */}
              <div style={fieldGroup}>
                <label style={labelStyle(theme)}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={selectStyle(theme)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Buttons */}
              <div style={buttonContainer}>
                <button type="submit" style={saveButtonStyle}>
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  style={cancelButtonStyle}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserGroupEdit;

/* ================= STYLES ================= */
const pageWrapper = {
  minHeight: "70vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

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
  maxWidth: "600px",
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

const formStyle = {
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const fieldGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle = (theme) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: theme === "dark" ? "#e2e8f0" : "#374151",
});

const inputStyle = (theme) => ({
  padding: "11px 14px",
  borderRadius: "8px",
  border: `1px solid ${theme === "dark" ? "#475569" : "#d1d5db"}`,
  background: theme === "dark" ? "#334155" : "#ffffff",
  color: theme === "dark" ? "#f1f5f9" : "#111827",
  fontSize: "14px",
  outline: "none",
});

const selectStyle = (theme) => ({
  padding: "10px",
  borderRadius: "8px",
  border: `1px solid ${theme === "dark" ? "#475569" : "#d1d5db"}`,
  background: theme === "dark" ? "#334155" : "#ffffff",
  color: theme === "dark" ? "#f1f5f9" : "#111827",
  cursor: "pointer",
});

const buttonContainer = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  marginTop: "10px",
};

const saveButtonStyle = {
  background: "linear-gradient(90deg,#16a34a,#22c55e)",
  color: "#ffffff",
  padding: "10px 22px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
};

const cancelButtonStyle = {
  background: "#ef4444",
  color: "#ffffff",
  padding: "10px 22px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
};
