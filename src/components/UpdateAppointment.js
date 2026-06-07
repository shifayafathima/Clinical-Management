import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    phonenumber: "",
    disease: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false); // ✅ Popup state

  // Load existing appointment data
  useEffect(() => {
    axios
      .get(`http://localhost:8080/getAppointmentById/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Error loading appointment:", err));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Submit update
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .put(`http://localhost:8080/updateAppointment/${id}`, form)
      .then(() => {
        setPopup(true); // ✅ Show popup

        setTimeout(() => {
          setPopup(false);
          navigate("/dashboard/appointments"); // redirect after popup
        }, 2000);
      })
      .catch(() => {
        setPopup(true);
        setTimeout(() => setPopup(false), 2000);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="form-container">
      <h2>Edit Appointment</h2>

      <form onSubmit={handleSubmit} className="edit-form">
        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />

        <label>Age</label>
        <input type="number" name="age" value={form.age} onChange={handleChange} required />

        <label>Phone Number</label>
        <input type="text" name="phonenumber" value={form.phonenumber} onChange={handleChange} required />

        <label>Disease</label>
        <input type="text" name="disease" value={form.disease} onChange={handleChange} required />

        <label>Date</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />

        <label>Time</label>
        <input type="time" name="time" value={form.time} onChange={handleChange} required />

        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "Updating..." : "Update Appointment"}
        </button>
      </form>

      {/* ✅ Popup Message */}
      {popup && (
        <div className="popup-box">
          <div className="popup-content">
            ✅ Appointment updated successfully!
          </div>
        </div>
      )}
    </div>
  );
}
