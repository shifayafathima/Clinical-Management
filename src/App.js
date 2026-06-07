// src/App.js
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import BookAppointment from "./components/BookAppointment";
import ReviewForm from "./components/ReviewForm";
import EditReview from "./components/EditReview";
import Login from "./components/Login";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <div className="layout">
      <Header />
      <div className="content-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/bookAppointment" element={<BookAppointment />} />
          <Route path="/reviewForm" element={<ReviewForm />} />
          <Route path="/editreview/:id" element={<EditReview />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
