import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaFolder,
  FaCog,
  FaBook,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    alert("You have been logged out!");
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <>
      {/* Toggle button for mobile */}
      <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h5>Admin Dashboard</h5>

        <ul>
          <li>
            <NavLink to="/dashboard" end>
              <FaBars /> Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminprofile">
              <FaUser /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminabout">
              <FaBook /> About
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects">
              <FaFolder /> Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/services">
              <FaCog /> Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog">
              <FaBook /> Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages">
              <FaEnvelope /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              <FaCog /> Settings
            </NavLink>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </div>
      </div>
    </>
  );
};

export default Sidebar;
