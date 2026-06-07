import { useNavigate,Route,Routes} from "react-router-dom";
import Sidebar from "./Sidebar";
import Appointment from "./Appointment";
import Patient from "./Patient";
import Review from "./Review";
import AddPatient from "./AddPatient"; 
import UpdatePatient from "./UpdatePatient"; 
import "../styles/Dashboard.css";
import UpdateAppointment from "./UpdateAppointment";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT
    navigate("/login"); // redirect to login
  };

  return (
    <div className="dashboard">
      {/* Top-left logout button */}
      
        <button  className="logout-btn" onClick={handleLogout} >
          Logout
        </button>
     

      <Sidebar />

      <div className="content">
        <Routes>
          <Route path="appointments" element={<Appointment />} />
          <Route path="patients" element={<Patient />} />
          <Route path="reviews" element={<Review />} />
          <Route path="addpatient" element={<AddPatient />} />
          <Route path="editpatient/:id" element={<UpdatePatient />} />
          <Route path="editappointment/:id" element={<UpdateAppointment />} />
        </Routes>
      </div>
    </div>
  );
}
