import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import "./Project.css";

// ✅ Normalize tech stack
const normalizeTags = (stack) => {
  if (Array.isArray(stack)) return stack;
  if (typeof stack === "string") return stack.split(",");
  return [];
};

const PortfolioHeader = () => {
  const [active, setActive] = useState("All");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState(["All"]);
  const [projects, setProjects] = useState([]);

  const filteredProjects =
    active === "All"
      ? projects
      : projects.filter((p) => p.category_name === active);

  // Fetch description
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getDescription.php")
      .then((res) => res.json())
      .then((data) => setDescription(data.description))
      .catch((err) => console.error("Error fetching description:", err));
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getCategories.php")
      .then((res) => res.json())
      .then((data) => setCategories(["All", ...data]))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch projects
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getProjects.php")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <>
      <Navbar />

      {/* =========================
          Portfolio Header
      ========================== */}
      <section className="portfolio-header">
        <h1>
          My <span>Portfolio</span>
        </h1>
        <p>{description}</p>
      </section>

      {/* =========================
          Projects Section
      ========================== */}
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
              {/* Image + Overlay */}
              <div className="project-image-wrapper">
                <img
                  src={proj.image || "/default-placeholder.jpg"}
                  alt={proj.name}
                />
                <div className="overlay-buttons">
                  {proj.live_url && (
                    <a
                      href={proj.live_url}
                      className="live-btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                  {proj.github_url && (
                    <a
                      href={proj.github_url}
                      className="github-btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGithub />
                    </a>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="project-content">
                <span className="project-category">{proj.category_name}</span>
                <h3>{proj.name}</h3>
                <p>{proj.description}</p>

                <div className="project-tags">
                  {normalizeTags(proj.tech_stack).map((tag, i) => (
                    <span key={i}>{tag.trim()}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          CTA Section
      ========================== */}
      <div className="project-section">
        <h1>Have a Project in Mind?</h1>
        <p>
          Let's collaborate and create something extraordinary together. I'm
          always excited to work on new challenges.
        </p>
        <button
          className="project-btn"
          onClick={() => (window.location.href = "/contact")}
        >
          Start a Project
        </button>
      </div>
    </>
  );
};

export default PortfolioHeader;
