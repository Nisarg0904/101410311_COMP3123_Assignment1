import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddEmployee.css";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: "",
    department: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/emp/employees`,
        employee
      );
      alert("Employee added successfully!");
      navigate("/employees");
    } catch (err) {
      setError("Failed to add employee. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/employees"); // Navigate back to the employee list
  };

  return (
    <div className="form-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          placeholder="First Name"
          value={employee.first_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="last_name">Last Name:</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={employee.last_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email Address"
          value={employee.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="position">Position:</label>
        <input
          id="position"
          type="text"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleChange}
          required
        />

        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          required
        />

        <label htmlFor="date_of_joining">Date of Joining:</label>
        <input
          id="date_of_joining"
          type="date"
          name="date_of_joining"
          value={employee.date_of_joining}
          onChange={handleChange}
          required
        />

        <label htmlFor="department">Department:</label>
        <input
          id="department"
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
          required
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit" className="save-button">
            Save
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddEmployee;
