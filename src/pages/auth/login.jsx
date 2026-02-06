import React, { useState } from "react";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ userId, password, rememberMe });
  };

  return (
    <>
      <style>{`
        /* Full page container */
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to right, #4facfe, #00f2fe);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Login box */
        .login-box {
          background: #fff;
          padding: 40px;
          border-radius: 10px;
          width: 350px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          text-align: center;
        }

        /* Heading */
        .login-box h2 {
          margin-bottom: 5px;
          color: #333;
        }

        .welcome-text {
          margin-bottom: 20px;
          color: #666;
        }

        /* Input fields */
        .input-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .input-group label {
          display: block;
          margin-bottom: 5px;
          color: #555;
        }

        .input-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }

        /* Checkbox and forgot password */
        .checkbox-group {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .checkbox-group a {
          text-decoration: none;
          color: #4facfe;
        }

        .checkbox-group a:hover {
          text-decoration: underline;
        }

        /* Sign in button */
        .login-btn {
          width: 100%;
          padding: 12px;
          background: #4facfe;
          border: none;
          border-radius: 5px;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .login-btn:hover {
          background: #00f2fe;
        }

        /* Footer */
        .footer-text {
          margin-top: 20px;
          font-size: 12px;
          color: #999;
        }
      `}</style>

      <div className="login-container">
        <div className="login-box">
          <h2>Advance School & College</h2>
          <p className="welcome-text">Welcome Back</p>
          <p>Sign in to your account to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                id="userId"
                placeholder="Enter your User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">Sign In</button>
          </form>

          <p className="footer-text">© 2026 Advance School & College. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Login;
