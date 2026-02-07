import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uapLogo from "../../assets/images/logo.jpg"; // Replace with your actual logo path
import { loginUser } from "../../services/authService"; // Make sure this exists

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // for redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!", { position: "top-right" });

        // Redirect after short delay
        setTimeout(() => {
          navigate("/dashboard"); // change to your dashboard route
        }, 1500);
      } else {
        toast.error("Invalid credentials!", { position: "top-right" });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Login failed!",
        { position: "top-right" }
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Inline CSS */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body { background: linear-gradient(135deg, #6a11cb, #2575fc); height: 100vh; display: flex; justify-content: center; align-items: center; overflow: hidden; position: relative; }
        .background-shapes .shape { position: absolute; border-radius: 50%; opacity: 0.2; animation: float 12s infinite alternate; }
        .shape1 { width: 250px; height: 250px; background: #ff6a00; top: -50px; left: -50px; }
        .shape2 { width: 300px; height: 300px; background: #ff1a75; bottom: -100px; right: -80px; }
        .shape3 { width: 180px; height: 180px; background: #00ffea; top: 120px; right: 50px; }
        @keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(20px) rotate(45deg); } 100% { transform: translateY(-20px) rotate(90deg); } }
        .login-container { width: 100%; max-width: 600px; padding: 40px; z-index: 1; }
        .login-box { background: rgba(255,255,255,0.1); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; padding: 40px 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); text-align: center; border: 1px solid rgba(255,255,255,0.2); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .login-box:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .login-logo { width: 80px; margin-bottom: 20px; }
        .login-title { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 10px; text-shadow: 1px 1px 6px rgba(0,0,0,0.3); }
        .welcome-text { font-size: 14px; color: #e0e0e0; margin-bottom: 25px; }
        .input-group { margin-bottom: 20px; text-align: left; }
        .input-group label { display: block; margin-bottom: 5px; font-size: 13px; color: #fff; }
        .input-with-icon { position: relative; }
        .input-with-icon .icon { position: absolute; top: 50%; left: 12px; transform: translateY(-50%); color: #00ffea; font-size: 16px; }
        .input-with-icon input { width: 100%; padding: 12px 12px 12px 38px; border: none; border-radius: 12px; font-size: 14px; background: rgba(255,255,255,0.2); color: #fff; transition: all 0.3s ease; outline: none; }
        .input-with-icon input::placeholder { color: rgba(255,255,255,0.7); }
        .input-with-icon input:focus { background: rgba(255,255,255,0.3); box-shadow: 0 0 10px #00ffea; }
        .toggle-password { position: absolute; top: 50%; right: 12px; transform: translateY(-50%); color: #00ffea; cursor: pointer; font-size: 16px; }
        .checkbox-group { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 13px; color: #fff; }
        .checkbox-group input[type="checkbox"] { margin-right: 5px; }
        .forgot-link { color: #00ffea; text-decoration: none; transition: all 0.3s ease; }
        .forgot-link:hover { text-decoration: underline; }
        .login-btn { width: 100%; padding: 12px; font-size: 16px; font-weight: 600; border: none; border-radius: 12px; background: linear-gradient(135deg, #6a11cb, #2575fc); color: #fff; cursor: pointer; transition: all 0.3s ease; }
        .login-btn:hover { background: linear-gradient(135deg, #2575fc, #6a11cb); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
        .login-btn:disabled { background: rgba(255,255,255,0.3); cursor: not-allowed; }
        .footer-text { margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.6); }
      `}</style>

      <div className="background-shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>

      <div className="login-container">
        <div className="login-box">
          <img src={uapLogo} alt="University Logo" className="login-logo" />
          <h2 className="login-title">Demo School & College</h2>
          <p className="welcome-text">Welcome Back! Sign in to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <FaUser className="icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

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

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link to="/forget-password" className="forgot-link">
                Forgot Your Password?
              </Link>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="footer-text">
            © 2026 Advance IT Solutions. All rights reserved.
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
