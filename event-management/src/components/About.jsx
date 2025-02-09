import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

function About() {
  const navigate = useNavigate();

  const teamMembers = [
    { role: "DashBoard and Home-Page", name: "Akash Pal" },
    { role: "Login-Signup Authentication", name: "Chirag Chhugani" },
    { role: "CSS and Event Creation", name: "Preeti Jha" },
    { role: "RSVP handling", name: "Dheeraj" },
  ];

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>This application was built by our dedicated team of developers.</p>

      <h2>Our Team</h2>
      <ul className="team-list">
        {teamMembers.map((member, index) => (
          <li key={index} className="team-member">
            <strong>{member.name}:</strong> {member.role}
          </li>
        ))}
      </ul>

      <button className="home-btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default About;
