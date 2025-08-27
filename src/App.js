import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Project from "./Pages/Project";

// Admin Pages
import Login from "./Admin/Login";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProfile from "./Admin/AdminProfile";
import AdminAbout from "./Admin/AdminAbout";
import AdminProject from "./Admin/AdminProject";



function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/adminabout" element={<AdminAbout />} />
        <Route path="/adminprojects" element={<AdminProject />} />


        
      </Routes>
    </Router>
  );
}

export default App;
