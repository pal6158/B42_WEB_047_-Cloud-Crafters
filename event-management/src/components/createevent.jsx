import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "../styles/CreateEvent.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    media: null,
    category: "",
    location: "",
    startTime: "",
    endTime: "",
    invitees: [],
  });

  const categories = [
    "Concert", "Standup Comedy", "Marriage", "Birthday Party", "Conference", "Webinar", "Festival", "Exhibition", "Workshop", "Charity Event"
  ];

  const handleError = (message) => {
    alert(message);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: name === "media" ? files[0] : value, // Ensure file is stored correctly
    }));
  };

  const handleInviteeChange = (e) => {
    const { value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      invitees: value.split(",").map(email => email.trim()), // Assuming comma-separated emails
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return handleError("You must be logged in to create an event.");
    }

    const { title, startTime, endTime, location, invitees, media, category } = eventData;
    if (!title || !startTime || !category || !location) {
      return handleError("All fields are required.");
    }

    const startDate = new Date(startTime).toISOString();
    const endDate = endTime ? new Date(endTime).toISOString() : startDate;

    try {
      setLoading(true); // Start loading state
      let mediaUrl = "";
      
      if (media) {
        // Check if a media file is chosen
        const mediaRef = ref(storage, `event_media/${user.uid}_${media.name}`);
        await uploadBytes(mediaRef, media); // Upload file to Firebase storage
        mediaUrl = await getDownloadURL(mediaRef); // Get URL after upload
      }

      // Add the event to Firestore with or without media
      await addDoc(collection(db, "events"), {
        title,
        category,
        location,
        startTime: startDate,
        endTime: endDate,
        invitees,
        media: mediaUrl, // Add media URL if uploaded
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
      });

      navigate("/dashboard"); // Navigate to dashboard after success
    } catch (err) {
      handleError(err.message); // Catch any errors
    } finally {
      setLoading(false); // Stop loading state after operation
    }
  };

  return (
    <div className="body-cont">
      <h1>Event Creation</h1>
      <form onSubmit={handleSubmit}>
        <label>Event Name:</label>
        <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
        
        <label>Category:</label>
        <select name="category" value={eventData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        
        <label>Upload Media:</label>
        <input type="file" name="media" onChange={handleChange} />
        
        <label>Venue Location:</label>
        <input type="text" name="location" value={eventData.location} onChange={handleChange} required />
        
        <label>Start Date and Time:</label>
        <input type="datetime-local" name="startTime" value={eventData.startTime} onChange={handleChange} required />
        
        <label>End Date and Time:</label>
        <input type="datetime-local" name="endTime" value={eventData.endTime} onChange={handleChange} />
        
        <label>Invitees (comma-separated emails):</label>
        <input type="text" name="invitees" value={eventData.invitees.join(", ")} onChange={handleInviteeChange} />
        
        <button type="submit" disabled={loading}>
          {loading ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
