import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import * as FaIcons from "react-icons/fa"; // import all icons

import heroBg from "../assets/hero-bg.jpg";
import profilePic from "../assets/my-photo.jpg";
import "./Home.css";

// Helper to normalize tech stack
const normalizeTags = (stack) => {
  if (Array.isArray(stack)) return stack;
  if (typeof stack === "string") return stack.split(",");
  return [];
};

// --- Icon mapping ---
const iconMap = {
  web: FaIcons.FaCode,
  design: FaIcons.FaPalette,
  mobile: FaIcons.FaMobileAlt,
  seo: FaIcons.FaSearch,
  marketing: FaIcons.FaBullhorn,
  backend: FaIcons.FaDatabase,
  frontend: FaIcons.FaLaptopCode,
  cloud: FaIcons.FaCloud,
  ui: FaIcons.FaDraftingCompass,
  ux: FaIcons.FaUser,
  commerce: FaIcons.FaShoppingCart,
  analytics: FaIcons.FaChartLine,
  security: FaIcons.FaShieldAlt,
  support: FaIcons.FaHeadset,
  ai: FaIcons.FaRobot,
  blockchain: FaIcons.FaCube,
  consulting: FaIcons.FaUsers,
  content: FaIcons.FaFileAlt,
  testing: FaIcons.FaCheckCircle,
  database: FaIcons.FaServer,
};

// --- Function to get icon by service name ---
const getIconByName = (name) => {
  if (!name) return FaIcons.FaCheck; // default fallback
  const lower = name.toLowerCase();
  for (const key in iconMap) {
    if (lower.includes(key)) return iconMap[key];
  }
  return FaIcons.FaCheck; // fallback
};

const Home = () => {
  const [cvLink, setCvLink] = useState("");
  const [socialLinks, setSocialLinks] = useState({});
  const [email, setEmail] = useState("");
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [subtitle, setSubtitle] = useState("");

  // Fetch CV
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getAbout.php")
      .then((res) => res.json())
      .then((data) => data.cv && setCvLink(data.cv))
      .catch((err) => console.error("Error fetching CV:", err));
  }, []);

  // Fetch social links
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/get_social_links.php")
      .then((res) => res.json())
      .then((data) => data.success && setSocialLinks(data.data))
      .catch((err) => console.error("Error fetching socials:", err));
  }, []);

  // Fetch email
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/get_info.php")
      .then((res) => res.json())
      .then((data) => data.success && data.data.Email && setEmail(data.data.Email))
      .catch((err) => console.error("Error fetching email:", err));
  }, []);

  // Fetch projects dynamically
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getProjects.php")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Fetch services subtitle
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getserviesDescription.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.description) setSubtitle(data.description);
      })
      .catch((err) => console.error("Error fetching service subtitle:", err));
  }, []);

  // Fetch services
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getServices.php")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setServices(data.slice(0, 3)); // only 3 services
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const words = ["🚀 Web Developer", "✨ Frontend Enthusiast", "⚡ Backend Enthusiast"];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const current = words[wordIndex];
    let timer;

    if (!isDeleting && text === current) {
      timer = setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && text === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 300);
    } else {
      const speed = isDeleting ? 50 : 110;
      timer = setTimeout(() => {
        setText(isDeleting ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1));
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="home-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="home-overlay" />
        <div className="home-content">
          <div className="home-profile">
            <img src={profilePic} alt="Faraz Ahmed" />
          </div>
          <h1>
            Hi, I'm <span className="home-highlight">Faraz Ahmed</span>
          </h1>
          <h2 className="home-typing" aria-live="polite">
            <span className="home-typed">{text}</span>
            <span className="home-cursor" aria-hidden="true" />
          </h2>
          <p>
            I build modern, responsive, and interactive web applications. Passionate about coding & problem solving, I deliver high-quality solutions that create amazing user experiences.
          </p>
          <div className="home-buttons">
            <NavLink to="/project" className="home-btn primary">
              ✨ View My Work
            </NavLink>
            {cvLink ? (
              <a href={cvLink} className="home-btn secondary" target="_blank" rel="noreferrer">
                ⬇ Download CV
              </a>
            ) : (
              <button className="home-btn secondary" disabled>
                CV Not Available
              </button>
            )}
          </div>

          {/* Social Icons */}
          <div className="home-socials">
            {socialLinks.LinkedIn && (
              <a href={socialLinks.LinkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            )}
            {socialLinks.GitHub && (
              <a href={socialLinks.GitHub} target="_blank" rel="noreferrer" aria-label="Github">
                <FaGithub />
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} aria-label="Email">
                <FaEnvelope />
              </a>
            )}
          </div>

          {/* Scroll Down */}
          <div className="home-scroll">
            <a href="#about">
              <i className="home-mouse"></i>
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="home-services">
        <h2 className="home-title">What I Do</h2>
        <p className="home-subtitle">{subtitle}</p>
        <div className="home-services-grid">
          {services.map((service, i) => {
            const IconComponent = getIconByName(service.name);
            return (
              <div className="home-service-card" key={i}>
                <div className="home-icon">
                  <IconComponent />
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="home-projects">
        <h2 className="home-title">Featured Projects</h2>
        <p className="home-subtitle">A showcase of my recent work and creative solutions.</p>

        <div className="home-projects-grid">
          {projects.map((proj) => (
            <div key={proj.id} className="home-project-card">
              <img src={proj.image || "/default-placeholder.jpg"} alt={proj.name} className="home-project-img" />
              <div className="home-project-content">
                <h3 className="home-project-title">{proj.name}</h3>
                <p className="home-project-desc">{proj.description}</p>
                <div className="home-tags">
                  {normalizeTags(proj.tech_stack).map((tag, i) => (
                    <span key={i} className="home-tag">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                <div className="home-project-links">
                  {proj.live_url && (
                    <a href={proj.live_url} target="_blank" rel="noreferrer">
                      <FiExternalLink /> Live
                    </a>
                  )}
                  {proj.github_url && (
                    <a href={proj.github_url} target="_blank" rel="noreferrer">
                      <FaGithub /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <NavLink to="/project" className="home-view-all">
          View All Projects →
        </NavLink>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="home-cta-content">
          <h2>Ready to Start Your Project?</h2>
          <p>Let’s collaborate and create something amazing together. Get in touch and let’s discuss your vision.</p>
          <NavLink to="/contact" className="home-cta-btn">
            Get In Touch →
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Home;
