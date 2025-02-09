import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Login.css";

function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const { login: loginUser, loading } = useContext(AuthContext); // Access the login function and loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = login;

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    await loginUser(email, password); // Use the login function from context
  };

  return (
    <>
      <div className="login-container">
        <div className="login-info">
          <h2>Login To EventEase</h2> {/* Updated to "EventEase" */}
          <ul>
            <li>✔ Offering You The Best Services You Need For Your Venue</li>
          </ul>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <h3>Login to EventEase</h3> {/* Updated to "EventEase" */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter Email"
              value={login.email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter Password"
              value={login.password}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    </>
  );
}

export default Login;
