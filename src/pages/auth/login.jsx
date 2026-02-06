import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../assets/pages/auth/login.css"; // Make sure path is correct
import uapLogo from "../../assets/images/logo.jpg"; // Replace with your actual logo path

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ userId, password, rememberMe });
    // Call your API here
  };

  return (
    <div className="login-page">
      <div className="background-shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>

      <div className="login-container">
        <div className="login-box">
          {/* Logo */}
          <img src={uapLogo} alt="University Logo" className="login-logo" />

          <h2 className="login-title">Demo School & College</h2>
          <p className="welcome-text">Welcome Back! Sign in to continue</p>

          <form onSubmit={handleSubmit}>
            {/* User ID */}
            <div className="input-group">
              <label htmlFor="userId">User ID</label>
              <div className="input-with-icon">
                <FaUser className="icon" />
                <input
                  type="text"
                  id="userId"
                  placeholder="Enter your User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <FaLock className="icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Checkbox & Forgot */}
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot Your Password ?</a>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="footer-text">© 2026 Advance IT Solutions. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
