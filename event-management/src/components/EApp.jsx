import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import "../styles/EApp.css";
const EApp= () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserEvents(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserEvents = async (userId) => {
    try {
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, where("createdBy", "==", userId)); // Only fetch logged-in user's events
      const snapshot = await getDocs(q);
      const userEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(userEvents);
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  };

  return (
    <>
      <div className="dashboard">
        <h1>My Events</h1>
        <div className="event-list">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="event-card">
                <h3>{event.title}</h3>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Date:</strong> {new Date(event.startTime).toDateString()}</p>
                {user && (
                  <button>
                    <Link to={`/editdetails/${event.id}`}>Edit Details</Link>
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No events created yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EApp;
