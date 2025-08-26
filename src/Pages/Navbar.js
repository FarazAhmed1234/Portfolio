import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <div className="logo-box">F</div>
        <span>Faraz Ahmed</span>
      </div>

      {/* Hamburger Icon */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" end onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/project" onClick={() => setIsOpen(false)}>
            Project
          </NavLink>
        </li>
        <li>
          <NavLink to="/services" onClick={() => setIsOpen(false)}>
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" onClick={() => setIsOpen(false)}>
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Admin Button */}
      <div className="admin-wrap">
        <NavLink to="/admin" className="admin-btn" onClick={() => setIsOpen(false)}>
          Admin
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
