import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles/EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (!userToken) {
      navigate("/");
    } else {
      setUsername(storedUsername || "User");
    }

 const fetchEmployees = async () => {
   const token = localStorage.getItem("token");
   const response = await axios.get(
     `${process.env.REACT_APP_API_BASE_URL}/emp/employees`,
     {
       headers: {
         Authorization: `Bearer ${token}`, // Include token in header
       },
     }
   );
   setEmployees(response.data);
 };

    fetchEmployees();
  }, [navigate]);

  const handleAddEmployee = () => {
    navigate("/addemployee");
  };

  return (
    <div>
      <Header username={username} />
      <div className="employee-list-container">
        <h2>Employee List</h2>
        <button onClick={handleAddEmployee}>Add Employee</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{`${employee.first_name} ${employee.last_name}`}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>
                  <button
                    onClick={() => navigate(`/employees/${employee._id}`)}
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/update-employee/${employee._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm("Are you sure you want to delete?")) {
                        await axios.delete(
                          `${process.env.REACT_APP_API_BASE_URL}/emp/employees?eid=${employee._id}`
                        );
                        setEmployees((prev) =>
                          prev.filter((emp) => emp._id !== employee._id)
                        );
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
