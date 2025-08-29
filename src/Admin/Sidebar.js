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
  FaTimes,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    alert("You have been logged out!");
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="mobile-toggle" onClick={toggleSidebar}>
        <FaBars />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h5 style={{ fontSize: "23px", marginLeft: "15px" }}>
            Admin Dashboard
          </h5>
          {/* Close button for mobile */}
          <FaTimes className="close-icon" onClick={toggleSidebar} />
        </div>

        <ul>
          <li>
            <NavLink to="/dashboard" end onClick={toggleSidebar}>
              <FaBars /> Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminprofile" onClick={toggleSidebar}>
              <FaUser /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminabout" onClick={toggleSidebar}>
              <FaBook /> About
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminprojects" onClick={toggleSidebar}>
              <FaFolder /> Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/adminservices" onClick={toggleSidebar}>
              <FaCog /> Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" onClick={toggleSidebar}>
              <FaBook /> Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages" onClick={toggleSidebar}>
              <FaEnvelope /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/information" onClick={toggleSidebar}>
              <FaCog /> Infomation
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
