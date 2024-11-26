import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/emp/employees/${id}`
      );
      setEmployee(response.data);
    };
    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div style={cardContainerStyles}>
      <div style={cardStyles}>
        <h2>Employee Details</h2>
        <p>
          <strong>Name:</strong> {employee.first_name} {employee.last_name}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Position:</strong> {employee.position}
        </p>
        <p>
          <strong>Salary:</strong> ${employee.salary}
        </p>
        <p>
          <strong>Date of Joining:</strong>{" "}
          {new Date(employee.date_of_joining).toLocaleDateString()}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <button onClick={() => navigate("/employees")}>Back</button>
      </div>
    </div>
  );
};

const cardContainerStyles = {
  display: "flex",
  justifyContent: "center",
  marginTop: "50px",
};

const cardStyles = {
  width: "400px",
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

export default ViewEmployee;
