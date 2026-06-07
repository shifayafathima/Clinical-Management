// src/components/Home.js
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../styles/Home.css";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);

  const menuRef = useRef(null); // for detecting outside clicks
  const navigate = useNavigate();

  // DELETE REVIEW METHOD
  const handleDelete = (id) => {
    if (window.confirm("Delete this review?")) {
      axios
        .delete(`http://localhost:8080/deleteReview/${id}`)
        .then(() => {
          setReviews(reviews.filter((r) => r.reviewid !== id));
        })
        .catch(() => alert("Error deleting review"));
    }
  };


  useEffect(() => {
    axios
      .get("http://localhost:8080/getallReviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (i) => {
    setOpenMenu(openMenu === i ? null : i);
  };

  return (
    <div className="home-container">

      {/* --- Carousel --- */}
      <div className="carousel">
        <div className="slides">
          <img className="img" src="/my.jpeg" alt="Clinic" />
          <img className="img" src="/myclinic3.jpeg" alt="Doctor" />
        </div>
      </div>

      {/* --- Welcome Section --- */}
      <section className="welcome">
        <h2>Welcome to Cureness Clinic</h2>
        <p>
          Providing high-quality general medicine care for all ages. Our clinic
          offers convenient appointments, personalized care, and expert
          consultations from experienced doctors.
        </p>
        <div className="btn-group">
          <Link to="/bookAppointment">
            <button className="btn">Book Appointment</button>
          </Link>
          <Link to="/reviewForm">
            <button className="btn btn-secondary">Write Review</button>
          </Link>
        </div>
      </section>

      {/* --- Reviews Section --- */}
      <section className="reviews-section">
        <h2>💬 Patient Reviews</h2>

        {reviews.length === 0 ? (
          <p className="no-reviews">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          <div className="reviews-grid"ref={menuRef}>
            {reviews.map((rev,index) => (
              <div key={rev.reviewid} className="review-card" >

                {/* Header */}
                <div className="review-header">
                  <FaUserCircle className="profile-icon" />

                  <div className="reviewer-info">
                    <h4>{rev.name}</h4>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          color={i < rev.rating ? "#ffc107" : "#e4e5e9"}
                          size={16}
                        />
                      ))}
                    </div>
                  </div>

                  {/* --- Three Dots Menu (⋮) --- */}
                  <span className="menu-dots" onClick={() => toggleMenu(index)}>
                    ⋮
                  </span>

                  {/* Dropdown */}
                  {openMenu === index && (
                    <div className="dropdown-menu">
                      <button className="menu-item" onClick={() => navigate(`/editReview/${rev.reviewid}`)}>
                        Edit Review
                      </button>

                      <button
                        className="menu-item delete"
                        onClick={() => handleDelete(rev.reviewid)}
                      >
                        Delete
                      </button>
                    </div>

                  )}
                </div>

                <p className="review-text">"{rev.review}"</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
