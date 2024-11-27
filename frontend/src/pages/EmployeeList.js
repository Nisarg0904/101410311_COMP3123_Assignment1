import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState({ department: "", position: "" });
  const [username, setUsername] = useState(""); // Store username
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/emp/employees`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setEmployees(response.data);
  };

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    const { department, position } = search;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/emp/employees/search`,
        {
          params: {
            department: department.trim().toLowerCase(),
            position: position.trim().toLowerCase(),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error searching employees:", error);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "User");

    fetchEmployees();
  }, []);

  return (
    <div className="employee-list-container">
      <header>
        <h3>Welcome, {username}</h3>
      </header>
      <div>
        <h2>Employee List</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Department"
            value={search.department}
            onChange={(e) =>
              setSearch({ ...search, department: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Search by Position"
            value={search.position}
            onChange={(e) => setSearch({ ...search, position: e.target.value })}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button
          onClick={() => navigate("/addemployee")}
          style={{ marginBottom: "20px" }}
        >
          Add Employee
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>
                <button
                  className="view"
                  onClick={() => navigate(`/employees/${employee._id}`)}
                >
                  <i className="fas fa-eye"></i>
                </button>
                <button
                  className="update"
                  onClick={() => navigate(`/update-employee/${employee._id}`)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="delete"
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to delete?")) {
                      const token = localStorage.getItem("token");
                      await axios.delete(
                        `${process.env.REACT_APP_API_BASE_URL}/emp/employees?eid=${employee._id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      setEmployees((prev) =>
                        prev.filter((emp) => emp._id !== employee._id)
                      );
                    }
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="legend-box">
        <h4>Action Legend</h4>
        <div className="legend-item">
          <div className="legend-color view"></div>
          <span>View</span>
        </div>
        <div className="legend-item">
          <div className="legend-color update"></div>
          <span>Update</span>
        </div>
        <div className="legend-item">
          <div className="legend-color delete"></div>
          <span>Delete</span>
        </div>
      </div>
      <div className="logout-container">
        <button onClick={() => navigate("/")}>Logout</button>
      </div>
    </div>
  );
};

export default EmployeeList;
