import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-container">
      <div className="about-content">
        <h1>About Event Management Platform</h1>
        <p>
          Welcome to our Event Creation and Management Platform! We are dedicated to providing you with seamless and intuitive solutions for creating, managing, and attending events.
        </p>
        <p>
          Our platform offers a comprehensive event creation wizard, RSVP tracking dashboard, interactive engagement tools, and AI-powered event recommendations to make your event planning process effortless and enjoyable.
        </p>
        <h2>Why Choose Us?</h2>
        <ul className="features-list">
          <li>📅 Effortless Event Creation</li>
          <li>📍 Location Selection and RSVP Tracking</li>
          <li>🗂️ Event Timeline and Media Sharing</li>
          <li>🤖 AI-Powered Event Recommendations</li>
        </ul>
        <p>
          Whether you're planning a corporate event, a social gathering, or a personal celebration, we've got you covered.
          Join us and experience the next level of event management!
        </p>
      </div>
    </section>
  );
};

export default About;
