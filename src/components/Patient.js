import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Table.css";
import axios from "axios";

export default function Patient() {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    axios
      .get("http://localhost:8080/getallPatient")
      .then((res) => setPatient(res.data))
      .catch((err) => console.error("Error fetching patients:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/deletePatient/${id}`)
      .then(() => loadPatients());
  };

  return (
    <div className="head">
      <div className="table-header">
        <h2>Patient Details</h2>

        <Link to="../addpatient">
          <button className="add-btn">➕ Add Patient</button>
        </Link>
      </div>

      <table className="table_colm">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {patient.map((p,index) => (
            <tr key={p.patientid}>
              <td>{index+1}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.phonenumber}</td>
              <td>{p.address}</td>

              {/* Edit Button */}
              <td>
                <Link to={`../editpatient/${p.patientid}`}>
                  <button>Edit</button>
                </Link>
              </td>

              {/* Delete Button */}
              <td>
                <button onClick={() => handleDelete(p.patientid)}>
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
