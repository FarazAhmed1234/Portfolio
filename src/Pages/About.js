import React from "react";
import { FaCode, FaUsers, FaMedal, FaCoffee, FaDownload, FaGraduationCap } from "react-icons/fa";
import Navbar from "./Navbar";
import "./About.css";

const About = () => {
  const skills = [
    { name: "React/Next.js", level: "95%" },
    { name: "Node.js", level: "85%" },
    { name: "Python", level: "80%" },
    { name: "TypeScript", level: "90%" },
    { name: "UI/UX Design", level: "90%" },
    { name: "AWS/Cloud", level: "75%" },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      institution: "XYZ University",
      year: "2020 - 2024",
    },
    {
      degree: "Intermediate in Computer Science",
      institution: "ABC College",
      year: "2018 - 2020",
    },
    {
      degree: "Matriculation (Science)",
      institution: "City High School",
      year: "2016 - 2018",
    },
  ];

  return (
    <>
      <Navbar />

      {/* About Section */}
      <section className="about-section">
        <h1 className="about-title">
          About <span>Me</span>
        </h1>
        <p className="about-text">
          Passionate developer and designer with a love for creating beautiful,
          functional digital experiences.
        </p>
      </section>

      {/* My Story Section */}
      <section className="story-section">
        <div className="story-container">
          {/* Left Side - Text */}
          <div className="story-text">
            <h2 className="story-title">My Story</h2>
            <p>
              My journey into web development started during my computer science
              studies, where I discovered my passion for creating intuitive user
              interfaces and solving complex problems through code.
            </p>
            <p>
              Over the years, I've had the privilege of working with diverse teams
              and clients, from startups to enterprise companies, helping them
              bring their digital visions to life.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new design trends,
              contributing to open-source projects, or enjoying a good cup of
              coffee while sketching ideas for my next project.
            </p>

            <button className="download-btn">
              <FaDownload /> Download CV
            </button>
          </div>

          {/* Right Side - Stats */}
          <div className="story-stats">
            <div className="stat-card">
              <FaCode className="stat-icon" />
              <h3>50+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <h3>30+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-card">
              <FaMedal className="stat-icon" />
              <h3>3+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-card">
              <FaCoffee className="stat-icon" />
              <h3>1000+</h3>
              <p>Cups of Coffee</p>
            </div>
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
          {skills.map((skill, index) => (
            <div key={index} className="skill">
              <div className="skill-header">
                <span>{skill.name}</span>
                <span>{skill.level}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: skill.level }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <h2 className="education-title">Education</h2>
              <p className="edu-subtitle">My academic journey and qualifications</p>

        <div className="education-container">
          {education.map((edu, index) => (
            <div key={index} className="education-card">
              <FaGraduationCap className="edu-icon" />
              <div>
                <h3>{edu.degree}</h3>
                <p>{edu.institution}</p>
                <span>{edu.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
