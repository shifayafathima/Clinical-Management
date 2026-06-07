import "../styles/About.css";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>📞 Contact Us</h2>
        <p className="contact-intro">
          We’re here to help! Reach out to us for appointments, inquiries, or feedback.
        </p>
        <div className="contact-info">
          <p><strong>Email:</strong> doctorclinic@gmail.com</p>
          <p><strong>Phone:</strong> +91 44000 66888</p>
          <p><strong>Address:</strong> 45, Green Park Road, Chennai</p>
        </div>
        <div className="contact-hours">
          <h4>Clinic Hours</h4>
          <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
}
