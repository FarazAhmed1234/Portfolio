import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

import "./Home.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaCode, FaPaintBrush, FaMobileAlt, FaGlobe } from "react-icons/fa";

import heroBg from "../assets/hero-bg.jpg";
import profilePic from "../assets/my-photo.jpg";

const Home = () => {
  const [cvLink, setCvLink] = useState("");
  const [socialLinks, setSocialLinks] = useState({});
  const [email, setEmail] = useState("");

  // Fetch CV
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getAbout.php")
      .then((res) => res.json())
      .then((data) => { if (data.cv) setCvLink(data.cv); })
      .catch((err) => console.error("Error fetching CV:", err));
  }, []);

  // Fetch social links
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/get_social_links.php")
      .then((res) => res.json())
      .then((data) => { if (data.success) setSocialLinks(data.data); })
      .catch((err) => console.error("Error fetching socials:", err));
  }, []);

  // Fetch email
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/get_info.php")
      .then((res) => res.json())
      .then((data) => { if (data.success && data.data.Email) setEmail(data.data.Email); })
      .catch((err) => console.error("Error fetching email:", err));
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
        setText(prev =>
          isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words]);

  const services = [
    {
      icon: <FaCode />,
      title: "Web Development",
      description: "Custom websites with modern technologies and best practices.",
    },
    {
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      description: "User-centered designs that are both beautiful and functional.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Apps",
      description: "Responsive applications that work seamlessly across devices.",
    },
    {
      icon: <FaGlobe />,
      title: "SEO Optimization",
      description: "Boost your online presence with strategic optimization.",
    },
  ];
  return (
    <>
      <Navbar />
      <section
        id="home"
        className="home-section"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="overlay" />

        <div className="home-content">
          <div className="profile-circle">
            <img src={profilePic} alt="Faraz Ahmed" />
          </div>

          <h1>
            Hi, I'm <span className="highlight">Faraz Ahmed</span>
          </h1>

          <h2 className="typing-text" aria-live="polite">
            <span className="typed-text">{text}</span>
            <span className="cursor" aria-hidden="true" />
          </h2>

          <p>
            I build modern, responsive, and interactive web applications.
            Passionate about coding & problem solving, I deliver high-quality
            solutions that create amazing user experiences.
          </p>

          <div className="buttons">
        

             <NavLink to="/project"  className="btn primary">✨ View My Work</NavLink>

            {cvLink ? (
              <a href={cvLink} className="btn secondary" target="_blank" rel="noreferrer">
                ⬇ Download CV
              </a>
            ) : (
              <button className="btn secondary" disabled>
                CV Not Available
              </button>
            )}
          </div>

          {/* Social Icons */}
          <div className="social-icons">
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
              <a
                href={`mailto:${email}`}
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            )}
          </div>

          {/* Scroll Down */}
          <div className="scroll-down">
            <a href="#about">
              <i className="mouse-icon"></i>
            </a>
          </div>
        </div>
      </section>

      <section className="what-i-do">
        <h2 className="section-title">What I Do</h2>
        <p className="section-subtitle">
          I specialize in creating digital experiences that combine beautiful
          design with powerful functionality.
        </p>

        <div className="services">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="project-cta">
        <div className="cta-content">
          <h2>Ready to Start Your Project?</h2>
          <p>
            Let’s collaborate and create something amazing together. Get in touch
            and let’s discuss your vision.
          </p>

          <NavLink to="/contact" className="cta-btn">Get In Touch →</NavLink>

        </div>
      </section>
    </>
  );
};

export default Home;
