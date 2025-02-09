import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Home.css";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [requestedEvents, setRequestedEvents] = useState({}); // Track requested events
  const [searchQuery, setSearchQuery] = useState(""); // Track search query
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [sortOrder, setSortOrder] = useState("asc"); // Track sort order
  const navigate = useNavigate();
  const auth = getAuth();

  const categories = [
    "Concert",
    "Standup Comedy",
    "Marriage",
    "Birthday Party",
    "Conference",
    "Webinar",
    "Festival",
    "Exhibition",
    "Workshop",
    "Charity Event",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user); // Store the entire user object to get email
      } else {
        setLoggedInUser(null);
      }
    });

    // Fetch events on load
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();

    return () => unsubscribe();
  }, [auth]);

  // Handle "Request to Attend" logic
  const handleRequest = (eventId) => {
    if (!loggedInUser) {
      alert("You must be logged in to request to attend.");
      navigate("/login");
      return;
    }

    // Set the event as requested and show alert
    setRequestedEvents((prevState) => ({
      ...prevState,
      [eventId]: true,
    }));

    alert("Your request to attend this event has been sent!");
  };

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter and sort events based on user input
  const filteredEvents = events
    .filter((event) => {
      return (
        (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCategory ? event.category === selectedCategory : true)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.startTime) - new Date(b.startTime);
      } else {
        return new Date(b.startTime) - new Date(a.startTime);
      }
    });

  return (
    <div className="home-container">
      <h1>Welcome, {loggedInUser ? loggedInUser.email : "Guest"}!</h1>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search for an event..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-dropdown"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="sort-dropdown"
        >
          <option value="asc">Sort by Date (Ascending)</option>
          <option value="desc">Sort by Date (Descending)</option>
        </select>
      </div>

      <div className="events-list">
        <h2>Upcoming Events</h2>

        {filteredEvents.length === 0 ? (
          <p>No events available at the moment.</p>
        ) : (
          <div className="event-cards">
            {filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <h3>{event.title}</h3>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Date:</strong> {new Date(event.startTime).toLocaleString()}</p>
                <p>{event.description}</p>
                <p><strong>Location:</strong> {event.location}</p>

                
                {event.invitees.includes(loggedInUser?.email) ? (
                  <button
                    className="view-details-btn"
                    onClick={() => handleEventClick(event.id)}
                  >
                    View Details
                  </button>
                ) : (
                  <button
                    className="request-attend-btn"
                    disabled={requestedEvents[event.id]} // Disable if already requested
                    onClick={() => handleRequest(event.id)}
                  >
                    {requestedEvents[event.id] ? "Requested" : "Request to Attend"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
