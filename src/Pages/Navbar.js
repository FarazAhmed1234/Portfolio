import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <div className="logo-box">F</div>
        <span>Faraz Ahmed</span>
      </div>

      {/* Links */}
      <ul className="nav-links">
        <li>
          <Link to="/" className="active">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/project">Project</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Admin Button */}
      <div>
        <Link to="/admin" className="admin-btn">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
