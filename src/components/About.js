import "../styles/About.css";


export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="text-section">
          <h2>About Our Clinic</h2>
          <p className="description">
            Welcome to <strong>Cureness Clinic</strong>, where we combine medical expertise
            with compassion. Led by <strong>Dr. Meera</strong>, a highly experienced
            <strong> Cardiologist & General Medicine Specialist</strong>, we are dedicated
            to providing comprehensive healthcare with a personal touch.
          </p>

          <div className="info-section">
            <p><strong>Doctor:</strong> Dr. Meera (MBBS, MD – Cardiology & General Medicine)</p>
            <p><strong>Address:</strong> 45, Green Park Road, Chennai</p>
            <p><strong>Open:</strong> 9:00 AM – 5:00 PM (Mon–Sat)</p>
            <p><strong>Contact:</strong> +91 44000 66888</p>
          </div>
        </div>

        <div className="image-section">
          <img src="../clinical1.jpeg" alt="Dr. Meera" className="doctor-img" />
          <img src="../clinical.jpeg" alt="Cureness Clinic" className="clinic-img" />
        </div>
      </div>
    </div>
  );
}
