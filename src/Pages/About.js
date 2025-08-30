import React, { useEffect, useState, useRef } from "react";
import { FaDownload, FaGraduationCap } from "react-icons/fa";
import Navbar from "./Navbar";
import "./About.css";

const About = () => {
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [aboutDetails, setAboutDetails] = useState({ details: "", story: "", cv: "" });

  const [visible, setVisible] = useState(false); // Track if skills are visible
  const skillsRef = useRef(null);

  // Fetch skills
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getSkills.php")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  // Fetch education
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getEducation.php")
      .then((res) => res.json())
      .then((data) => setEducation(data))
      .catch((err) => console.error("Error fetching education:", err));
  }, []);

  // Fetch about details
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getAbout.php")
      .then((res) => res.json())
      .then((data) => setAboutDetails(data))
      .catch((err) => console.error("Error fetching about details:", err));
  }, []);

  // Intersection Observer for skills
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 }
    );

    if (skillsRef.current) observer.observe(skillsRef.current);

    return () => {
      if (skillsRef.current) observer.unobserve(skillsRef.current);
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* About Section */}
      <section className="about-section">
        <h1 className="about-title">
          About <span>Me</span>
        </h1>
        <p className="about-text">{aboutDetails.details}</p>
      </section>

      {/* My Story */}
      <section className="story-section">
        <div className="story-container">
          <div className="story-text">
            <h2 className="story-title">My Story</h2>
            <h3>{aboutDetails.story}</h3>

            <a href={aboutDetails.cv} download className="download-btn">
              <FaDownload /> Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section" ref={skillsRef}>
        <h2 className="skills-title">Skills & Expertise</h2>
        <p className="skills-subtitle">
          Technologies and tools I use to bring ideas to life.
        </p>

        <div className="skills-container">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <SkillBar
                key={index}
                name={skill.skill}
                percentage={parseInt(skill.percentage)}
                visible={visible}
                direction={index % 2 === 0 ? "left" : "right"} // Alternate directions
              />
            ))
          ) : (
            <p>Loading skills...</p>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <h2 className="education-title">Education</h2>
        <p className="edu-subtitle">My academic journey and qualifications</p>

        <div className="education-container">
          {education.length > 0 ? (
            education.map((edu, index) => (
              <div key={index} className="education-card">
                <FaGraduationCap className="edu-icon" />
                <div>
                  <h3>{edu.name}</h3>
                  <p>{edu.institution}</p>
                  <span>
                    {edu.start_year} - {edu.end_year}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>Loading education...</p>
          )}
        </div>
      </section>
    </>
  );
};

// SkillBar Component with counter + direction
const SkillBar = ({ name, percentage, visible, direction }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (visible && count < percentage) {
      const interval = setInterval(() => {
        setCount((prev) => (prev < percentage ? prev + 1 : percentage));
      }, 20); // speed
      return () => clearInterval(interval);
    }
  }, [visible, count, percentage]);

  return (
    <div className={`skill ${direction}`}>
      <div className="skill-header">
        <span>{name}</span>
        <span>{count}%</span>
      </div>
      <div className="progress-bar">
        <div
          className={`progress-fill ${direction}`}
          style={{
            width: visible ? `${percentage}%` : "0%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default About;
