import React from "react";
import "./Certifications.css";
import { FaCertificate, FaCheckCircle , FaCalendarAlt} from "react-icons/fa";
import Navbar from "./Navbar";

const certificates = [
  {
    title: "React - The Complete Guide 2024",
    platform: "Udemy",
    date: "November 15, 2024",
    description:
      "Comprehensive course covering React fundamentals, hooks, context, state management, and modern patterns.",
    skills: ["React", "JavaScript", "Redux", "Next.js", "TypeScript"],
    credential: "UC-12345678",
    verified: true,
  },
  {
    title: "Advanced JavaScript Concepts",
    platform: "FreeCodeCamp",
    date: "October 22, 2024",
    description:
      "Deep dive into advanced JavaScript concepts including closures, prototypes, async programming, and design patterns.",
    skills: ["JavaScript", "ES6+", "Async/Await", "Design Patterns", "Performance"],
    credential: "FCC-JS-2024-001",
    verified: true,
  },
  {
    title: "UI/UX Design Specialization",
    platform: "Coursera - CalArts",
    date: "September 18, 2024",
    description:
      "Comprehensive program covering user research, wireframing, prototyping, and visual design principles.",
    skills: ["UI Design", "UX Research", "Figma", "Prototyping", "User Testing"],
    credential: "ABCD1234",
    verified: true,
  },
];
const Certifications = () => {
  return (
    <>
    <Navbar />
    <section className="cert-section">
      <h2 className="cert-title">
        Certifications <span>& Achievements</span>
      </h2>
      <p className="cert-subtitle">
        Continuous learning and professional development in web development,
        design, and modern technologies. All certifications are verified and validated.
      </p>

      <div className="cert-buttons">
        <button className="cert-btn">
          <FaCertificate /> 6 Certificates
        </button>
        <button className="cert-btn">
          <FaCheckCircle /> 100% Verified
        </button>
      </div>
    </section>

       <section className="certificates-section">
      <div className="cert-grid">
        {certificates.map((cert, index) => (
          <div key={index} className="cert-card">
            <div className="cert-header">
              <h3>{cert.title}</h3>
              {cert.verified && <span className="verified">Verified</span>}
            </div>
            <p className="cert-platform">{cert.platform}</p>

            <p className="cert-date">
              <FaCalendarAlt /> {cert.date}
            </p>

            <p className="cert-description">{cert.description}</p>

            <div className="skills">
              {cert.skills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>

            <p className="cert-id">Credential ID: {cert.credential}</p>

            <button className="verify-btn">
              <FaCheckCircle /> Verify Certificate
            </button>
          </div>
        ))}
      </div>
    </section>

    </>
  );
};

export default Certifications;
