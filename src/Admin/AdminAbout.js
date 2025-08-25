import React from "react";
import Sidebar from "./Sidebar";
import "./AdminAbout.css";

const About = () => {
  return (
    <>
      <Sidebar />
      <div className="page-container">
        <h2>About</h2>
        <p>
          Welcome to the Admin Dashboard.  
          This system helps manage projects, services, blogs, messages, and more.  
          You can customize and expand it based on your needs.
        </p>
        <p>
          <b>Version:</b> 1.0.0  
          <br />
          <b>Developed by:</b> Your Team
        </p>
      </div>
    </>
  );
};

export default About;
