import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center md:text-left">
        
       
        <div>
          <h3 className="text-xl font-semibold">EventEase Event Management</h3> {/* Updated to "EventEase" */}
          <p className="text-gray-400 mt-2">
            Making every event unforgettable with <br /> professional planning and execution.
          </p>
          <p className="text-gray-400 mt-2">
            Contact Us: (123) 456-7890 | events@masai.com
          </p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold">Subscribe</h3>
          <form className="mt-2 flex flex-col md:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-md text-black w-full md:w-auto"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
