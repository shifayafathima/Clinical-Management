import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditReview.css";
import axios from "axios";


export default function ReviewEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phonenumber: "",
    rating: 0,
    review: "",
  });

  const [popup, setPopup] = useState(false);

  // Load review data
  useEffect(() => {
    axios
      .get(`http://localhost:8080/getReviewById/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Error fetching review:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/updateReview/${id}`, form)
      .then(() => {
        setPopup(true);
        setTimeout(() => {
          setPopup(false);
          navigate("/"); // Go back to home
        }, 2000);
      })
      .catch(() => alert("Error updating review"));
  };

  return (
    <div className="edit-review-container">
      <h2>Edit Review</h2>

      <form onSubmit={handleSubmit} className="edit-review-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
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

        <label>Rating</label>
        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          required
        >
          <option value="">Select Rating</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>

        <label>Review</label>
        <textarea
          name="review"
          value={form.review}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        <button type="submit" className="save-btn">
          Update Review
        </button>
      </form>

      {popup && (
        <div className="popup-box">
          <div className="popup-content">Review Updated Successfully!</div>
        </div>
      )}
    </div>
  );
}
