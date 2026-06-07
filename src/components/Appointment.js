import { useState, useEffect } from "react";
import { Link } from "react-router-dom";   // ✅ You forgot this
import "../styles/Table.css";
import axios from "axios";

export default function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [selectDate, setSelectDate] = useState("");
  const [FilterAppointment, setFilterAppointment] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/getallAppointment").then((res) => {
      setAppointment(res.data);
    });
  }, []);

  const handleDate = (e) => {
    setSelectDate(e.target.value);
  };

  const handleSearch = () => {
    if (selectDate === "") {
      setFilterAppointment(appointment);
    } else {
      setFilterAppointment(appointment.filter((a) => a.date === selectDate));
    }
  };

  // ✅ Delete function for appointment
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/deleteAppointment/${id}`)
      .then(() => {
        // refresh list after deletion
        setAppointment(appointment.filter((a) => a.appointmentid !== id));
        setFilterAppointment(FilterAppointment.filter((a) => a.appointmentid !== id));
      });
  };

  return (
    <div className="haed">
      <h2>Appointments</h2>

      <div className="filter">
        <label>Filter by Date:</label>
        <input type="date" value={selectDate} onChange={handleDate} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <table className="table_colm">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>PhoneNumber</th>
            <th>Disease</th>
            <th>Date</th>
            <th>Time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody className="table_colm">
          {(FilterAppointment.length > 0 ? FilterAppointment : appointment).map(
            (a,index) => (
              <tr key={a.appointmentid}>
                <td>{index+1}</td>
                <td>{a.name}</td>
                <td>{a.age}</td>
                <td>{a.phonenumber}</td>
                <td>{a.disease}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>

                {/* ✅ Edit Button */}
                <td>
                  <Link to={`../editappointment/${a.appointmentid}`}>
                    <button>Edit</button>
                  </Link>
                </td>

                {/* ✅ Delete Button */}
                <td>
                  <button onClick={() => handleDelete(a.appointmentid)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
