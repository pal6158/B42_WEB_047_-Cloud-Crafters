import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; 
import { app } from "../firebase"; 
import "../styles/EditDetails.css";

const EditDetails = () => {
  const { _id } = useParams();
  const navigate = useNavigate(); 
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    startTime: "",
    endTime: "",
    location: "",
    media: null,
  });

  const db = getFirestore(app); 
  // Function to fetch data
  const getdata = async () => {
    try {
      const eventDocRef = doc(db, "events", _id); // Get specific event by ID
      const docSnapshot = await getDoc(eventDocRef);

      if (docSnapshot.exists()) {
        const eventData = docSnapshot.data();
        setEvent(eventData); // Set fetched event data
        setFormData({
          title: eventData.title || "",
          category: eventData.category || "",  
          startTime: eventData.startTime || "",
          endTime: eventData.endTime || "",
          location: eventData.location || "",
          media: eventData.media || null,
        });
      } else {
        console.error("No such event found!");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  useEffect(() => {
    if (_id) {
      getdata();
    } else {
      console.error("Event ID is missing.");
    }
  }, [_id]); 

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle media file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      media: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventDocRef = doc(db, "events", _id); // Get reference to the event document
      await updateDoc(eventDocRef, {
        title: formData.title,
        category: formData.category, // Updated to category
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        media: formData.media, 
      });

      navigate(`/dashboard`); 
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!event) {
    return <h1>Loading...</h1>; // Show a loading message while fetching data
  }

  return (
    <>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title || ""}
            onChange={handleChange} // Handle input change
          />
        </div>
        <div>
          <label>Category</label>
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleChange} // Handle category change
          >
            <option value="">Select a category</option>
            <option value="Concert">Concert</option>
            <option value="Standup Comedy">Standup Comedy</option>
            <option value="Marriage">Marriage</option>
            <option value="Birthday Party">Birthday Party</option>
            <option value="Conference">Conference</option>
            <option value="Webinar">Webinar</option>
            <option value="Festival">Festival</option>
            <option value="Exhibition">Exhibition</option>
            <option value="Workshop">Workshop</option>
            <option value="Charity Event">Charity Event</option>
          </select>
        </div>
        <div>
          <label>Media</label>
          <input
            type="file"
            name="media"
            onChange={handleFileChange} // Handle file change
          />
        </div>
        <div>
          <label>Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime || ""}
            onChange={handleChange} // Handle start time change
          />
        </div>
        <div>
          <label>End Time</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime || ""}
            onChange={handleChange} // Handle end time change
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location || ""}
            onChange={handleChange} // Handle location change
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default EditDetails;
