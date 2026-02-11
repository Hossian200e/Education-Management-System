import React, { useState, useContext } from "react";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserGroupAdd = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const [titleEn, setTitleEn] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [ordering, setOrdering] = useState("");
  const [status, setStatus] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (code.includes(" ")) {
      toast.error("Group code cannot contain spaces.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: theme === "dark" ? "dark" : "light",
        pauseOnHover: true,
        draggable: true,
        closeOnClick: true,
      });
      return;
    }

    const groups = JSON.parse(localStorage.getItem("groups") || "[]");

    const duplicate = groups.find(
      (group) => group.code?.toLowerCase() === code.toLowerCase()
    );

    if (duplicate) {
      toast.error("Group code already exists. Use a unique code.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: theme === "dark" ? "dark" : "light",
        pauseOnHover: true,
        draggable: true,
        closeOnClick: true,
      });
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: title,
      titleEn,
      code,
      ordering: Number(ordering),
      status,
    };

    const updatedGroups = [...groups, newGroup];
    localStorage.setItem("groups", JSON.stringify(updatedGroups));

    toast.success("User Group added successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: theme === "dark" ? "dark" : "light",
      pauseOnHover: true,
      draggable: true,
      closeOnClick: true,
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
          <span style={breadcrumbCurrent(theme)}>Add User Group</span>
        </div>

        {/* ===== Center Page Wrapper ===== */}
        <div style={pageWrapper}>
          <div style={cardStyle(theme)}>
            <div style={cardHeader(theme)}>Add New User Group</div>

            <form onSubmit={handleSubmit} style={formStyle}>
              {/* Title (En) */}
              <div style={fieldGroup}>
                <label style={labelStyle(theme)}>
                  Title (En) <span style={requiredMark}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter English title"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  required
                  style={inputStyle(theme)}
                />
              </div>

              {/* Title */}
              <div style={fieldGroup}>
                <label style={labelStyle(theme)}>
                  Title <span style={requiredMark}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter group title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={inputStyle(theme)}
                />
              </div>

              {/* Group Code */}
              <div style={fieldGroup}>
                <label style={labelStyle(theme)}>
                  Group Code <span style={requiredMark}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter unique code (no spaces)"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  style={inputStyle(theme)}
                />
              </div>

              {/* Ordering */}
              <div style={fieldGroup}>
                <label style={labelStyle(theme)}>Ordering</label>
                <input
                  type="number"
                  placeholder="Enter display order"
                  value={ordering}
                  onChange={(e) => setOrdering(e.target.value)}
                  style={inputStyle(theme)}
                />
              </div>

              {/* Status */}
              <div style={fieldGroup}>
                <label style={labelStyle(theme)}>Status</label>
                <select
                  value={status ? "Active" : "Inactive"}
                  onChange={(e) => setStatus(e.target.value === "Active")}
                  style={selectStyle(theme)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div style={buttonContainer}>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  style={closeButton}
                >
                  Back
                </button>

                <button type="submit" style={submitButton}>
                  Add User Group
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserGroupAdd;

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

const pageWrapper = {
  minHeight: "70vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

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

const requiredMark = {
  color: "#ef4444",
  marginLeft: "4px",
};

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
  justifyContent: "space-between",
  marginTop: "10px",
};

const closeButton = {
  background: "#ef4444",
  color: "#ffffff",
  padding: "10px 24px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
};

const submitButton = {
  background: "linear-gradient(90deg,#16a34a,#22c55e)",
  color: "#ffffff",
  padding: "10px 24px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
};
