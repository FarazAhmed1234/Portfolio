import React from "react";
import Navbar from "./Navbar";

import "./Project.css";

const Project = () => {
  const projects = [
    {
      title: "University Management System",
      description: "A role-based system with Admin, Teacher, and Student dashboards using React & PHP.",
    },
    {
      title: "Cricket Ticket Booking System",
      description: "C++ project implementing data structures like Linked Lists, Queues, and File Handling.",
    },
    {
      title: "Course Management System",
      description: "React + PHP CRUD system with teacher-course assignment and MySQL integration.",
    },
  ];

  return (
    <>
    <Navbar />
        <section id="portfolio" className="project-section">
      <h2>My Projects</h2>
      <div className="project-grid">
        {projects.map((proj, index) => (
          <div key={index} className="project-card">
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
          </div>
        ))}
      </div>
    </section>

    </>
  );
};

export default Project;
