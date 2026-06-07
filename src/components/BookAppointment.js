import React, { useState } from "react";
import axios from "axios";
import "../styles/BookAppointment.css";

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    disease: "",
    phonenumber: "",
    date: "",
    time: "",
  });

  const [popup, setPopup] = useState(false);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDate = formData.date;
    const selectedTime = formData.time;

    const now = new Date();
    const todayDate = now.toISOString().split("T")[0];

    // Time validation (if today)
    if (selectedDate === todayDate) {
      const currentTime = now.toTimeString().split(":").slice(0, 2).join(":");

      if (selectedTime <= currentTime) {
        alert(" You cannot select a past time for today's appointment.");
        return;
      }
    }

    axios
      .post("http://localhost:8080/saveAppointment", formData)
      .then(() => {
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
          window.location.href = "/";
        }, 2500);
      })
      .catch((err) => {
        console.error("❌ Error saving appointment:", err);
        alert("Failed to book appointment. Please try again.");
      });
  };

  return (
    <div className="book-container">
      <h2>Book Appointment</h2>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" onChange={handleChange} required />

        <label>Disease:</label>
        <select
          name="disease"
          onChange={handleChange}
          value={formData.disease}
          required
        >
          <option value="">Select Disease</option>
          <option value="Fever">Fever</option>
          <option value="Cold">Cold</option>
          <option value="Stomach Pain">Stomach Pain</option>
          <option value="Chest Pain">Chest Pain</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Blood Pressure">Blood Pressure</option>
        </select>

        {/* Disable past dates */}
        <label>Date:</label>
        <input
          type="date"
          name="date"
          min={today}
          onChange={handleChange}
          required
        />

        <label>Time:</label>
        <input type="time" name="time" onChange={handleChange} required />

        <button type="submit">Book Appointment</button>
      </form>

      {/* Popup Box */}
      {popup && (
        <div className="popup-box">
          <div className="popup-content">
            ✅ Appointment booked successfully!
          </div>
        </div>
      )}
    </div>
  );
}
