import React, { useState, useEffect } from "react";
import "./AdminCertifications.css";
import Sidebar from "./Sidebar";
import axios from "axios";

const API_URL = "http://localhost:8080/backend-portfolio/certifications.php";

const Certifications = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [certification, setCertification] = useState({
    id: null,
    name: "",
    institution: "",
    description: "",
    skills: "",
    credentialId: "",
    dateOfIssue: "",
    verifyLink: "",
  });

  const [certifications, setCertifications] = useState([]);

  // Fetch certifications
  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    const res = await axios.get(API_URL);
    setCertifications(res.data);
  };

  // Input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertification({ ...certification, [name]: value });
  };

  // Add / Update certification
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update
        await axios.put(API_URL, certification);
        alert("Certification updated!");
      } else {
        // Add new
        await axios.post(API_URL, certification);
        alert("Certification added!");
      }

      setShowForm(false);
      setIsEditing(false);
      fetchCertifications();

      // Reset form
      setCertification({
        id: null,
        name: "",
        institution: "",
        description: "",
        skills: "",
        credentialId: "",
        dateOfIssue: "",
        verifyLink: "",
      });
    } catch (err) {
      alert("Error saving certification!");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL, { data: { id } });
      setCertifications(certifications.filter((c) => c.id !== id));
    } catch (err) {
      alert("Error deleting certification!");
    }
  };

  // Edit button click
  const handleEdit = (cert) => {
    setCertification(cert);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <>
      <Sidebar />
      <div className="certifications-container">
        <button className="add-cert-btn" onClick={() => {
          setIsEditing(false);
          setCertification({
            id: null,
            name: "",
            institution: "",
            description: "",
            skills: "",
            credentialId: "",
            dateOfIssue: "",
            verifyLink: "",
          });
          setShowForm(true);
        }}>
          + Add Certification
        </button>

        {/* Certification Cards */}
        <div className="cert-list">
          {certifications.map((cert) => (
            <div className="cert-card" key={cert.id}>
              <h3>{cert.name}</h3>
              <p><strong>Institution:</strong> {cert.institution}</p>
              {cert.dateOfIssue && <p><strong>Date:</strong> {cert.dateOfIssue}</p>}
              {cert.credentialId && <p><strong>Credential ID:</strong> {cert.credentialId}</p>}
              {cert.skills && <p><strong>Skills:</strong> {cert.skills}</p>}
              {cert.description && <p>{cert.description}</p>}
              {cert.verifyLink && (
                <p><a href={cert.verifyLink} target="_blank" rel="noreferrer">Verify Link</a></p>
              )}

              <div className="cert-card-actions">
                <button className="edit-btn" onClick={() => handleEdit(cert)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(cert.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Form Popup */}
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <h2>{isEditing ? "Edit Certification" : "Add Certification"}</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Certification Name"
                  value={certification.name} onChange={handleChange} required />
                <input type="text" name="institution" placeholder="Institution"
                  value={certification.institution} onChange={handleChange} required />
                <textarea name="description" placeholder="Description"
                  value={certification.description} onChange={handleChange}></textarea>
                <input type="text" name="skills" placeholder="Skills"
                  value={certification.skills} onChange={handleChange} />
                <input type="text" name="credentialId" placeholder="Credential ID"
                  value={certification.credentialId} onChange={handleChange} />
                <input type="date" name="dateOfIssue"
                  value={certification.dateOfIssue} onChange={handleChange} />
                <input type="url" name="verifyLink" placeholder="Verify Link"
                  value={certification.verifyLink} onChange={handleChange} />

                <div className="form-actions">
                  <button type="submit">{isEditing ? "Update" : "Save"}</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Certifications;
