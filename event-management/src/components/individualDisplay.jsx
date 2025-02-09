import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import emailjs from "emailjs-com";
import Footer from "./Footer";
import { app } from "../firebase";
import "../styles/IndividualEvent.css";

function IndividualEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [rsvpResponse, setRsvpResponse] = useState(null); // Track RSVP response
  const db = getFirestore(app);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventRef = doc(db, "events", id);
        const eventSnap = await getDoc(eventRef);

        if (eventSnap.exists()) {
          setEvent(eventSnap.data());
        } else {
          console.log("No such event found!");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, db]);

  
  useEffect(() => {
    if (user) {
      const fetchRsvp = async () => {
        const rsvpRef = collection(db, "rsvps");
        const q = query(rsvpRef, where("eventId", "==", id), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setRsvpResponse(querySnapshot.docs[0].data().response); // Set the existing RSVP response if it exists
        }
      };

      fetchRsvp();
    }
  }, [id, user, db]);

  const handleRsvpChange = (e) => {
    setRsvpResponse(e.target.value);
  };

  const handleRsvpSubmit = async () => {
    if (user && rsvpResponse) {
      try {
        const eventCreatorEmail = event.createdBy; // Assuming you store the creator's email here
  
        const emailParams = {
          from_name: user.displayName,
          event_name: event.title,
          response: rsvpResponse,
          to_email: eventCreatorEmail,
        };
  
        const result = await emailjs.send(
          'service_addbmil',
          'template_uxbssik',
          emailParams,
          '-XFHnl6LEpLEhbEq5'
        );
  
        console.log('Email sent successfully:', result.text);
        alert("RSVP recorded and email sent!");
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Failed to send RSVP email.");
      }
    } else {
      alert("Please select an RSVP response.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading event details...</p>;
  }

  if (!event) {
    return <p className="text-center mt-10">Event not found!</p>;
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen pb-16">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 flex flex-wrap">
          {/* Event Image */}
          <img src={event.media} alt="Event" className="w-80 h-96 object-cover rounded-lg" />

          <div className="flex-1 px-6">
            {/* Event Name */}
            <h1 className="text-4xl font-bold text-purple-600">{event.title}</h1>

            {/* Event Category */}
            <p className="mt-4 text-lg"><strong>Category:</strong> {event.category}</p>

            {/* Event Description */}
            <p className="mt-4 text-lg">{event.description}</p>

            {/* Event Date and Time */}
            <p className="mt-2 text-lg"><strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}</p>
            <p className="mt-2 text-lg"><strong>End Time:</strong> {new Date(event.endTime).toLocaleString()}</p>

            {/* Venue Location */}
            <p className="mt-2 text-lg">
              <strong>Venue:</strong> {event.location}
            </p>

            {/* Invitees */}
            <p className="mt-4 text-lg"><strong>Invitees:</strong> {event.invitees.join(", ")}</p>

            {/* RSVP Section */}
            <div className="mt-4">
              {user ? (
                <div>
                  <select
                    value={rsvpResponse || ""}
                    onChange={handleRsvpChange}
                    className="bg-green-500 text-white p-2 rounded-md"
                  >
                    <option value="">Want to Respond?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="maybe">Maybe</option>
                  </select>
                  <button
                    className="mt-2 bg-blue-500 text-white p-2 rounded-md"
                    onClick={handleRsvpSubmit}
                  >
                    Submit RSVP
                  </button>
                </div>
              ) : (
                <p className="text-red-500">Log in to RSVP for this event.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default IndividualEvent;
