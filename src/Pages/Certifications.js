import React, { useEffect, useState } from "react";
import "./Certifications.css";
import { FaCertificate, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import axios from "axios";

const API_URL = "http://localhost:8080/backend-portfolio/certificat.php"; 
// <-- Change to your actual backend API

const Certifications = () => {
  const [certificates, setCertificates] = useState([]);

  // Fetch from database
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setCertificates(res.data); // assuming backend returns JSON array
      })
      .catch((err) => {
        console.error("Error fetching certifications:", err);
      });
  }, []);

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
            <FaCertificate /> {certificates.length} Certificates
          </button>
          <button className="cert-btn">
            <FaCheckCircle /> 100% Verified
          </button>
        </div>
      </section>

      <section className="certificates-section">
        <div className="cert-grid">
          {certificates.map((cert, index) => (
            <div key={index} className="cert-card1">
              <div className="cert-header">
                <h3>{cert.name}</h3>
                {cert.verifyLink && <span className="verified">Verified</span>}
              </div>

              <p className="cert-platform">{cert.institution}</p>

              <p className="cert-date">
                <FaCalendarAlt /> {cert.dateOfIssue}
              </p>

              <p className="cert-description">{cert.description}</p>

              <div className="skills">
                {cert.skills?.split(",").map((skill, i) => (
                  <span key={i} className="skill-tag">
                    {skill.trim()}
                  </span>
                ))}
              </div>

              <p className="cert-id">Credential ID: {cert.credentialId}</p>

              {cert.picture && (
                <img
                  src={`http://localhost:8080/backend-portfolio/uploads/${cert.picture}`}
                  alt={cert.name}
                  className="cert-image"
                />
              )}

              {cert.verifyLink && (
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="verify-btn"
                >
                  <FaCheckCircle /> Verify Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Certifications;
