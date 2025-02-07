import React from "react";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="forgot-password">Forgot your password?</p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
