import React, { useState } from "react";
import "../../assets/pages/auth/forgetPassword.css"; 

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }
    // Here you can call your API to send reset password email
    setMessage(`Password reset link sent to ${email}`);
    setEmail("");
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-card">
        <h2 className="forget-password-title">Forgot Your Password?</h2>
        <p className="forget-password-text">
          Enter your registered email below to receive password reset instructions.
        </p>
        <form onSubmit={handleSubmit} className="forget-password-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forget-password-input"
            required
          />
          <button type="submit" className="forget-password-btn">
            Send Reset Link
          </button>
        </form>
        {message && <p className="forget-password-message">{message}</p>}
        <div className="back-to-login">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
