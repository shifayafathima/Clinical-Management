import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ReviewForm.css"

export default function ReviewForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    review: "",
    rating: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/saveReviews", formData)
      .then(() => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/"); // Redirect to home
        }, 2000);
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        alert("❌ Failed to submit review. Please try again.");
      });
  };

  return (
    <div className="review-container">
      <h2>Write a Review 📝</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phonenumber"
          placeholder="Enter phone number"
          value={formData.phonenumber}
          onChange={handleChange}
          required
        />

        <label>Review</label>
        <textarea
          name="review"
          placeholder="Write your review..."
          value={formData.review}
          onChange={handleChange}
          required
        ></textarea>

        <label>Rating (1-5)</label>
        <input
          type="number"
          name="rating"
          placeholder="Enter rating"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Review</button>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>✅ Review Submitted!</h3>
            <p>Thank you for your feedback 💬</p>
          </div>
        </div>
      )}
    </div>
  );
}
