import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddPatient.css";

export default function AddPatient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phonenumber: "",
    address: "",
  });
  const [popup, setPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/savepatient", formData)
      .then(() => {
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
          navigate("/dashboard/patients"); // ✅ Redirect back inside Dashboard
        }, 2500);
      })
      .catch((err) => {
        console.error("Error adding patient:", err);
        alert("Failed to add patient. Please try again.");
      });
  };

  return (
    <div className="patient-container">
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter patient name"
          onChange={handleChange}
          required
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          placeholder="Enter age"
          onChange={handleChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phonenumber"
          placeholder="Enter phone number"
          onChange={handleChange}
          required
        />

        <label>Address:</label>
        <textarea
          name="address"
          rows="3"
          placeholder="Enter address"
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Add Patient</button>
      </form>

      {popup && (
        <div className="popup-box">
          <div className="popup-content">✅ Patient added successfully!</div>
        </div>
      )}
    </div>
  );
}
