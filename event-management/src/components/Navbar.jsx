import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import { FaUserCircle } from "react-icons/fa"; 
import "../styles/Navbar.css";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Access user state and logout function
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
  };

  return (
    <nav className="navbar">
      <div id="nav-head">
        <b>EventEase</b> {/* Updated to "EventEase" */}
        <p id="Head">Your Event Management Platform</p>
      </div>

      <ul className={`navbar-link ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-event">Create Event</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        {user ? (
          <>
            <li>
              <span className="user-icon" onClick={handleLogout}>
                <FaUserCircle />
              </span>
              <p>Logout</p>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>

      <div className="menu" onClick={toggleMenu}>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
      </div>
    </nav>
  );
};

export default Navbar;
