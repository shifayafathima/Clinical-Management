import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/UpdatePatient.css";
import axios from "axios";

export default function UpdatePatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    phonenumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null); // ✅ success or error popup

  // Load existing patient data
  useEffect(() => {
    axios
      .get(`http://localhost:8080/getPatientById/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Error loading patient:", err));
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
      .put(`http://localhost:8080/updatePatient/${id}`, form)
      .then(() => {
        setPopup("Patient updated successfully! 🎉");

        setTimeout(() => {
          setPopup(null);
          navigate("/dashboard/patients"); 
        }, 2000);
      })
      .catch(() => {
        setPopup("❌ Error updating patient!");

        setTimeout(() => {
          setPopup(null);
        }, 2000);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="form-container">
      <h2>Edit Patient</h2>

      <form onSubmit={handleSubmit} className="edit-form">

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Age</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phonenumber"
          value={form.phonenumber}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "Updating..." : "Update Patient"}
        </button>
      </form>

      {/* ✅ Popup message */}
      {popup && (
        <div className="popup-box">
          <div className="popup-content">{popup}</div>
        </div>
      )}
    </div>
  );
}
