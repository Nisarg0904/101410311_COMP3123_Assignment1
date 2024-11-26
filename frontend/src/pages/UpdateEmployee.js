import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UpdateEmployee.css";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/emp/employees/${id}`
        );
        setEmployee(response.data);
      } catch (err) {
        setError("Failed to load employee details.");
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/emp/employees/${id}`,
        employee
      );
      alert("Employee updated successfully!");
      navigate("/employees");
    } catch (err) {
      setError("Failed to update employee. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/employees"); // Navigate back to the employee list
  };

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className="form-container">
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          value={employee.first_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="last_name">Last Name:</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          value={employee.last_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="position">Position:</label>
        <input
          id="position"
          type="text"
          name="position"
          value={employee.position}
          onChange={handleChange}
          required
        />

        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          type="number"
          name="salary"
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
          value={employee.department}
          onChange={handleChange}
          required
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="submit" className="save-button">
            Update
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

export default UpdateEmployee;
