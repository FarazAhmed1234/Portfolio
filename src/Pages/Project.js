import React, { useState } from "react";
import Navbar from "./Navbar";

import "./Project.css";






const categories = ["All", "Web Development", "Mobile Apps", "UI/UX Design", "E-commerce"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "E-commerce",
    desc: "A modern e-commerce platform built with React, Node.js, and Stripe integration for seamless online shopping experience.",
    image: "https://via.placeholder.com/400x250", // replace with real image
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    demo: "#"
  },
  {
    id: 2,
    title: "Task Management App",
    category: "Web Development",
    desc: "A collaborative task management application with real-time updates, team collaboration features, and productivity analytics.",
    image: "https://via.placeholder.com/400x250",
    tags: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
    demo: "#"
  },
  {
    id: 3,
    title: "Fitness Mobile App",
    category: "Mobile Apps",
    desc: "A comprehensive fitness tracking app with workout plans, progress tracking, and social features for motivation.",
    image: "https://via.placeholder.com/400x250",
    tags: ["React Native", "Firebase", "Redux", "Expo"],
    demo: "#"
  }
];


const PortfolioHeader = () => {
    const [active, setActive] = useState("All");

  const filteredProjects =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
    <Navbar />
    <section className="portfolio-header">
      <h1>
        My <span>Project</span>
      </h1>
      <p>
        A collection of projects that showcase my skills in web development,
        mobile apps, and creative design solutions.
      </p>
    </section>

        <section className="projects-section">
      {/* Filter Buttons */}
      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${active === cat ? "active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="project-card">
            <img src={proj.image} alt={proj.title} />
            <div className="project-content">
              <span className="project-category">{proj.category}</span>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>

              <div className="project-tags">
                {proj.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>

              <a href={proj.demo} className="demo-btn" target="_blank" rel="noreferrer">
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>


     <section className="cta-section">
      <h2>Have a Project in Mind?</h2>
      <p>
        Let's collaborate and create something extraordinary together. 
        I'm always excited to work on new challenges.
      </p>
      <a href="#contact" className="cta-btn">Start a Project</a>
    </section>

    </>
  );
};

export default PortfolioHeader;
