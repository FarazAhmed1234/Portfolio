import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaPlus, FaEdit, FaTrash, FaChevronDown } from "react-icons/fa";
import "./AdminAbout.css";

const About = () => {
  // -------- Details States --------
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState("");
  const [story, setStory] = useState("");
  const [cv, setCv] = useState(null);
  const [aboutList, setAboutList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // -------- Skills States --------
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skill, setSkill] = useState("");
  const [percentage, setPercentage] = useState("");
  const [skillsList, setSkillsList] = useState([]);
  const [editSkillId, setEditSkillId] = useState(null);

  // -------- Education States --------
  const [showEduModal, setShowEduModal] = useState(false);
  const [eduName, setEduName] = useState("");
  const [eduStart, setEduStart] = useState("");
  const [eduEnd, setEduEnd] = useState("");
  const [eduInstitution, setEduInstitution] = useState("");
  const [eduList, setEduList] = useState([]);
  const [editEduId, setEditEduId] = useState(null);

  // ---------- Fetch Functions ----------
  const fetchDetails = async () => {
    try {
      const res = await fetch("http://localhost:8080/backend-portfolio/get_about.php");
      const result = await res.json();
      if (result.status === "success") setAboutList(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await fetch("http://localhost:8080/backend-portfolio/get_skills.php");
      const data = await res.json();
      if (data.status === "success") setSkillsList(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEducation = async () => {
    try {
      const res = await fetch("http://localhost:8080/backend-portfolio/get_education.php");
      const data = await res.json();
      if (data.status === "success") setEduList(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchSkills();
    fetchEducation();
  }, []);

  // ---------- Details Handlers ----------
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setDetails("");
    setStory("");
    setCv(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("details", details);
    formData.append("story", story);
    if (cv) formData.append("cv", cv);
    if (editId) formData.append("id", editId);

    try {
      const res = await fetch(
        editId
          ? "http://localhost:8080/backend-portfolio/update_about.php"
          : "http://localhost:8080/backend-portfolio/save_about.php",
        { method: "POST", body: formData }
      );
      const result = await res.json();
      if (result.status === "success") {
        alert(editId ? "Details updated!" : "Details saved!");
        handleCloseModal();
        fetchDetails();
      } else alert("Error: " + result.message);
    } catch (err) {
      console.error(err);
      alert("Request failed!");
    }
  };

  const handleEdit = (item) => {
    setDetails(item.details);
    setStory(item.story);
    setCv(null);
    setEditId(item.id);
    setShowModal(true);
  };

  const handleDelete = async (id, type, category) => {
    if (!window.confirm(`Are you sure you want to delete ${category}?`)) return;
    try {
      const res = await fetch(`http://localhost:8080/backend-portfolio/delete_about.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type }),
      });
      const result = await res.json();
      if (result.status === "success") {
        alert(`${category} deleted successfully!`);
        fetchDetails();
      } else alert("Error: " + result.message);
    } catch (err) {
      console.error(err);
      alert("Delete request failed!");
    }
  };

  // ---------- Skills Handlers ----------
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    const percentageNum = Number(percentage);
    if (percentageNum <= 0 || percentageNum > 100) {
      alert("❌ Percentage must be 1-100!");
      return;
    }

    const formData = new FormData();
    formData.append("skill", skill);
    formData.append("percentage", percentageNum);
    if (editSkillId) formData.append("id", editSkillId);

    try {
      const res = await fetch(
        editSkillId
          ? "http://localhost:8080/backend-portfolio/update_skill.php"
          : "http://localhost:8080/backend-portfolio/save_skill.php",
        { method: "POST", body: formData }
      );
      const result = await res.json();
      if (result.status === "success") {
        alert(editSkillId ? "Skill updated!" : "Skill added!");
        setShowSkillModal(false);
        setSkill("");
        setPercentage("");
        setEditSkillId(null);
        fetchSkills();
      } else alert("Error: " + result.message);
    } catch (err) {
      console.error(err);
      alert("Request failed!");
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await fetch("http://localhost:8080/backend-portfolio/delete_skill.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.status === "success") fetchSkills();
      else alert("Error: " + result.message);
    } catch (err) {
      console.error(err);
      alert("Request failed!");
    }
  };

  // ---------- Education Handlers ----------
  const handleEduSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", eduName);
    formData.append("start_year", eduStart);
    formData.append("end_year", eduEnd);
    formData.append("institution", eduInstitution);
    if (editEduId) formData.append("id", editEduId);

    try {
      const res = await fetch(
        editEduId
          ? "http://localhost:8080/backend-portfolio/update_education.php"
          : "http://localhost:8080/backend-portfolio/save_education.php",
        { method: "POST", body: formData }
      );
      const result = await res.json();
      if (result.status === "success") {
        alert(editEduId ? "Education updated!" : "Education added!");
        setShowEduModal(false);
        setEduName("");
        setEduStart("");
        setEduEnd("");
        setEduInstitution("");
        setEditEduId(null);
        fetchEducation();
      } else alert("Error: " + result.message);
    } catch (err) {
      console.error(err);
      alert("Request failed!");
    }
  };

  const handleEditEdu = (edu) => {
    setEduName(edu.name);
    setEduStart(edu.start_year);
    setEduEnd(edu.end_year);
    setEduInstitution(edu.institution);
    setEditEduId(edu.id);
    setShowEduModal(true);
  };

  const handleDeleteEdu = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education?")) return;
    try {
      const res = await fetch("http://localhost:8080/backend-portfolio/delete_education.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.status === "success") fetchEducation();
      else alert("Error: " + result.message);
    } catch (err) {
      console.error(err);
      alert("Request failed!");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="page-container">
        <h2 className="about">About Page</h2>

        {/* Details Section */}
        <h1>Details</h1>
        <div className="about-list">
          {aboutList.length > 0 ? (
            aboutList.map((item) => (
              <div key={item.id} className="about-card">
                <div className="about-row">
                  <strong>Details:</strong> <span>{item.details}</span>
                </div>
                <div className="about-row">
                  <strong>Story:</strong> <span>{item.story}</span>
                </div>
                {item.cv && (
                  <div className="about-row">
                    <strong>CV:</strong>{" "}
                    <a
                      href={`http://localhost:8080/backend-portfolio/uploads/${item.cv}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download CV
                    </a>
                  </div>
                )}
                <div className="card-actions">
                  <button className="btn edit1" onClick={() => handleEdit(item)}>
                    <FaEdit /> Edit
                  </button>
                  <div className="dropdown">
                    <button
                      className="btn delete"
                      onClick={() =>
                        setDropdownOpen(dropdownOpen === item.id ? null : item.id)
                      }
                    >
                      <FaTrash /> Delete <FaChevronDown />
                    </button>
                    {dropdownOpen === item.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => handleDelete(item.id, "all", "All")}>
                          Delete All
                        </button>
                        <button onClick={() => handleDelete(item.id, "details", "Details")}>
                          Delete Details
                        </button>
                        <button onClick={() => handleDelete(item.id, "story", "Story")}>
                          Delete Story
                        </button>
                        <button onClick={() => handleDelete(item.id, "cv", "CV")}>Delete CV</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No details added yet.</p>
          )}
        </div>

        {/* Skills Section */}
        <h1 style={{ marginTop: "150px" }}>Skills</h1>
        <div className="about-buttons">
          <button className="btn-skill" onClick={() => setShowSkillModal(true)}>
            <FaPlus /> Add Skills
          </button>
        </div>
        <div className="skills-list">
          {skillsList.length > 0 ? (
            skillsList.map((s) => (
              <div key={s.id} className="skill-card">
                <div className="skill-header">{s.skill}</div>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ width: `${s.percentage}%` }}></div>
                </div>
                <button
                  className="btn edit"
                  onClick={() => {
                    setSkill(s.skill);
                    setPercentage(s.percentage);
                    setEditSkillId(s.id);
                    setShowSkillModal(true);
                  }}
                >
                  Edit
                </button>
                <button className="btn delete" onClick={() => handleDeleteSkill(s.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            ))
          ) : (
            <p>No skills added yet.</p>
          )}
        </div>

        {/* Education Section */}
         <h1 style={{ marginTop: "150px" }}>Education</h1>
        <div className="about-buttons">
          <button className="btn-add" onClick={() => setShowEduModal(true)} >
            <FaPlus /> Add Education
          </button>
        </div>
<div className="education-list">
  
  {eduList.length > 0 ? (
    eduList.map((edu) => (
      <div key={edu.id} className="education-card">
        <h3>{edu.name}</h3>
        <p>{edu.institution}</p>
        <span>{edu.start_year} - {edu.end_year}</span>
        <br />
        <br />
        
        <button className="btn edit" onClick={() => handleEditEdu(edu)}>
          <FaEdit /> Edit
        </button>
        <button className="btn delete" onClick={() => handleDeleteEdu(edu.id)}>
          <FaTrash /> Delete
        </button>
      </div>
    ))
  ) : (
    <p>No education added yet.</p>
  )}
</div>

    

        {/* Details Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{editId ? "Edit Details" : "Add Details"}</h3>
              <form onSubmit={handleSubmit}>
                <label>Details</label>
                <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} required />
                <label>Story</label>
                <textarea value={story} onChange={(e) => setStory(e.target.value)} required />
                <label>Upload CV</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCv(e.target.files[0])} required={!editId} />
                <div className="modal-actions">
                  <button type="submit" className="btn">Save</button>
                  <button type="button" className="btn cancel" onClick={handleCloseModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Skill Modal */}
        {showSkillModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{editSkillId ? "Edit Skill" : "Add Skill"}</h3>
              <form onSubmit={handleSkillSubmit}>
                <label>Skill</label>
                <input type="text" value={skill} onChange={(e) => setSkill(e.target.value)} required />
                <label>Knowledge (%)</label>
                <input type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} min="1" max="100" required />
                <div className="modal-actions">
                  <button type="submit" className="btn">Save</button>
                  <button type="button" className="btn cancel" onClick={() => setShowSkillModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Education Modal */}
        {showEduModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{editEduId ? "Edit Education" : "Add Education"}</h3>
              <form onSubmit={handleEduSubmit}>
                <label>Education / Degree Name</label>
                <input type="text" value={eduName} onChange={(e) => setEduName(e.target.value)} required />

                <label>Start Year</label>
                <input type="number" value={eduStart} onChange={(e) => setEduStart(e.target.value)} required />

                <label>End Year</label>
                <input type="number" value={eduEnd} onChange={(e) => setEduEnd(e.target.value)} required />

                <label>Institution</label>
                <input type="text" value={eduInstitution} onChange={(e) => setEduInstitution(e.target.value)} required />

                <div className="modal-actions">
                  <button type="submit" className="btn">Save</button>
                  <button type="button" className="btn cancel" onClick={() => setShowEduModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default About;
