import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uapLogo from "../../assets/images/logo.jpg"; // Replace with your logo path
import { requestPasswordReset } from "../../services/authService"; // your API call

const ForgetPassword = () => {
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await requestPasswordReset(identifier);
      toast.success(
        data.message || "Check your email or phone for the reset link/code!"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forget-page">
      {/* Inline CSS */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body { background: linear-gradient(135deg, #6a11cb, #2575fc); height: 100vh; display: flex; justify-content: center; align-items: center; overflow: hidden; position: relative; }

        .background-shapes .shape { position: absolute; border-radius: 50%; opacity: 0.2; animation: float 10s infinite alternate; }
        .shape1 { width: 250px; height: 250px; background: #ff6a00; top: -50px; left: -50px; }
        .shape2 { width: 300px; height: 300px; background: #ff1a75; bottom: -100px; right: -80px; }
        .shape3 { width: 180px; height: 180px; background: #00ffea; top: 120px; right: 50px; }
        @keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(20px) rotate(45deg); } 100% { transform: translateY(-20px) rotate(90deg); } }

        .forget-container { width: 100%; max-width: 420px; padding: 20px; z-index: 1; }
        .forget-box { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; padding: 40px 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); text-align: center; border: 1px solid rgba(255,255,255,0.2); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .forget-box:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }

        .forget-logo { width: 80px; margin-bottom: 20px; }
        .forget-title { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 10px; text-shadow: 1px 1px 6px rgba(0,0,0,0.3); }
        .forget-text { font-size: 14px; color: #e0e0e0; margin-bottom: 25px; }

        .input-group { margin-bottom: 20px; text-align: left; }
        .input-group label { display: block; margin-bottom: 5px; font-size: 13px; color: #fff; }
        .input-with-icon { position: relative; }
        .input-with-icon .icon { position: absolute; top: 50%; left: 12px; transform: translateY(-50%); color: #00ffea; }
        .input-with-icon input { width: 100%; padding: 12px 12px 12px 38px; border: none; border-radius: 12px; font-size: 14px; background: rgba(255,255,255,0.2); color: #fff; transition: all 0.3s ease; outline: none; }
        .input-with-icon input::placeholder { color: rgba(255,255,255,0.7); }
        .input-with-icon input:focus { background: rgba(255,255,255,0.3); box-shadow: 0 0 10px #00ffea; }

        .forget-btn { width: 100%; padding: 12px; font-size: 16px; font-weight: 600; border: none; border-radius: 12px; background: linear-gradient(135deg, #6a11cb, #2575fc); color: #fff; cursor: pointer; transition: all 0.3s ease; }
        .forget-btn:hover { background: linear-gradient(135deg, #2575fc, #6a11cb); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
        .forget-btn:disabled { background: rgba(255,255,255,0.3); cursor: not-allowed; }

        .back-link { display: inline-flex; align-items: center; margin-top: 20px; font-size: 14px; color: #00ffea; text-decoration: none; transition: all 0.3s ease; }
        .back-link:hover { text-decoration: underline; }
        .back-link svg { margin-right: 5px; }
      `}</style>

      <div className="background-shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>

      <div className="forget-container">
        <div className="forget-box">
          <img src={uapLogo} alt="University Logo" className="forget-logo" />
          <h2 className="forget-title">Forget Password</h2>
          <p className="forget-text">
            Enter your email or phone number to reset your password
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="identifier">Email or Phone</label>
              <div className="input-with-icon">
                {identifier.includes("@") ? (
                  <FaEnvelope className="icon" />
                ) : (
                  <FaPhone className="icon" />
                )}
                <input
                  type="text"
                  id="identifier"
                  placeholder="Enter your email or phone"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="forget-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <Link to="/login" className="back-link">
            <FaArrowLeft /> Back to Login
          </Link>
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default ForgetPassword;
