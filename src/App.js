import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Project from "./Pages/Project";
import ContactPage from "./Pages/ContactPage";
import Services from "./Pages/Services";


// Admin Pages
import Login from "./Admin/Login";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProfile from "./Admin/AdminProfile";
import AdminAbout from "./Admin/AdminAbout";
import AdminProject from "./Admin/AdminProject";
import AdminMessage from "./Admin/AdminMessage";
import AdminInfomation from "./Admin/AdminInfomation";
import AdminServices from "./Admin/AdminServices";





function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<Services />} />


        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/adminabout" element={<AdminAbout />} />
        <Route path="/adminprojects" element={<AdminProject />} />
        <Route path="/messages" element={<AdminMessage />} />
        <Route path="/information" element={<AdminInfomation />} />
        <Route path="/adminservices" element={<AdminServices />} />


        
      </Routes>
    </Router>
  );
}

export default App;
