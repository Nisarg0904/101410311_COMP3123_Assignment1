import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header style={headerStyles}>
      <h3>Welcome, {username}</h3>
      <button onClick={handleLogout} style={logoutButtonStyles}>
        Logout
      </button>
    </header>
  );
};

const headerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  background: "#007bff",
  color: "white",
};

const logoutButtonStyles = {
  background: "white",
  color: "#007bff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Header;
