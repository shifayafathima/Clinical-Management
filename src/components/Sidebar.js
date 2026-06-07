import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserInjured, FaStar } from "react-icons/fa";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard/appointments">
        < FaUserDoctor className="icon"/>Appointments</Link></li>
        <li><Link to="/dashboard/patients">
        <FaUserInjured className="icon"/>Patients</Link></li>
        <li><Link to="/dashboard/reviews">
        <FaStar className="icon"/> Reviews</Link></li>
      </ul>
    </div>
  );
}
