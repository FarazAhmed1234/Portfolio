import React, { useEffect, useState } from "react";
import { FaCode, FaUsers, FaMedal, FaCoffee, FaDownload, FaGraduationCap } from "react-icons/fa";
import Navbar from "./Navbar";
import "./About.css";

const About = () => {
 const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
    const [aboutDetails, setAboutDetails] = useState({ details: "", story: "", cv: "" });



  // Fetch skills from backend
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
  
    useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getAbout.php")
      .then((res) => res.json())
      .then((data) => setAboutDetails(data))
      .catch((err) => console.error("Error fetching about details:", err));
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

      <section className="story-section">
            <div className="story-container">
              {/* Left Side - Text */}
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
       <section className="skills-section">
        <h2 className="skills-title">Skills & Expertise</h2>
        <p className="skills-subtitle">
          Technologies and tools I use to bring ideas to life.
        </p>

        <div className="skills-container">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div key={index} className="skill">
                <div className="skill-header">
                  <span>{skill.skill}</span>
                  <span>{skill.percentage}</span>
                </div>
                <div className="progress-bar">
              <div
            className="progress-fill"
            style={{ width: `${skill.percentage}%` }} // Force % format
          ></div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading skills...</p>
          )}
        </div>
      </section>

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
                  <span>{edu.start_year} - {edu.end_year}</span>
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

export default About;
