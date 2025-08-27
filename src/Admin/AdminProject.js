import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "./AdminProject.css";

// ---- Modal for Descriptions & Criteria ----
const Modal = ({ title, value, setValue, onSave, onClose, placeholder }) => (
  <div className="project-modal">
    <div className="project-modal-content">
      <h3>{title}</h3>
      {title.includes("Description") ? (
        <textarea
          className="project-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          className="project-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      )}
      <div className="project-modal-actions">
        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  </div>
);

// ---- Modal for Project with multiple fields including image ----
const ProjectModal = ({ projectData, setProjectData, onSave, onClose, categories }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProjectData({ ...projectData, image: files[0] });
    } else {
      setProjectData({ ...projectData, [name]: value });
    }
  };

  return (
    <div className="project-modal">
      <div className="project-modal-content">
        <h3>Add / Edit Project</h3>

        <input
          type="text"
          name="name"
          value={projectData.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="project-input"
        />

       <select
  name="category_name"    // ✅ use category_name instead of category_name
  value={projectData.category_name || ""}
  onChange={handleChange}
  className="project-input"
>
  <option value="">Select Category</option>
  {categories.map((c) => (
    <option key={c.id} value={c.name}>   {/* ✅ send category name */}
      {c.name}
    </option>
  ))}
</select>


        <textarea
          name="description"
          value={projectData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="project-textarea"
        />

        <input
          type="text"
          name="tech_stack"
          value={projectData.tech_stack || ""}
          onChange={handleChange}
          placeholder="Tech Stack (e.g., React, Node.js)"
          className="project-input"
        />

        <input
          type="text"
          name="live_url"
          value={projectData.live_url || ""}
          onChange={handleChange}
          placeholder="Live URL"
          className="project-input"
        />

        <input
          type="text"
          name="github_url"
          value={projectData.github_url || ""}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="project-input"
        />

        {/* Image upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="project-input"
        />

        <div className="project-modal-actions">
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Project = () => {
  const [modalType, setModalType] = useState(""); // description, criteria, project
  const [editId, setEditId] = useState(null);

  // Input States
  const [description, setDescription] = useState("");
  const [criteriaName, setCriteriaName] = useState("");
  const [projectData, setProjectData] = useState({
    name: "",
  category_name: "",   
    description: "",
    tech_stack: "",
    live_url: "",
    github_url: "",
    image: null,
  });

  // Display States
  const [descriptions, setDescriptions] = useState([]);
  const [criteriaList, setCriteriaList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const descRes = await fetch(
        "http://localhost:8080/backend-portfolio/get_descriptions.php"
      );
      setDescriptions(await descRes.json());

      const criteriaRes = await fetch(
        "http://localhost:8080/backend-portfolio/get_criteria.php"
      );
      setCriteriaList(await criteriaRes.json());

      const projectRes = await fetch(
        "http://localhost:8080/backend-portfolio/get_projects.php"
      );
      setProjects(await projectRes.json());
    } catch (error) {
      console.error(error);
      alert("Error fetching data. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Save Data ----
  const saveData = async (type) => {
    if (type === "description") {
      if (!description.trim()) return alert("Description cannot be empty");
      const payload = { description, id: editId };
      const url = editId
        ? "http://localhost:8080/backend-portfolio/update_description.php"
        : "http://localhost:8080/backend-portfolio/add_description.php";
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        alert(data.message);
        setModalType("");
        setEditId(null);
        setDescription("");
        fetchData();
      } catch (error) {
        alert("Error saving description.");
      }
    } else if (type === "criteria") {
      if (!criteriaName.trim()) return alert("Category name cannot be empty");
      const payload = { name: criteriaName, id: editId };
      const url = editId
        ? "http://localhost:8080/backend-portfolio/update_criteria.php"
        : "http://localhost:8080/backend-portfolio/add_criteria.php";
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        alert(data.message);
        setModalType("");
        setEditId(null);
        setCriteriaName("");
        fetchData();
      } catch (error) {
        alert("Error saving category.");
      }
    } else if (type === "project") {
      if (!projectData.name.trim()) return alert("Project name is required");
      if (!projectData.category_name) return alert("Category is required");

      const formData = new FormData();
      for (let key in projectData) {
        formData.append(key, projectData[key]);
      }
      if (editId) formData.append("id", editId);

      const url = editId
        ? "http://localhost:8080/backend-portfolio/update_project.php"
        : "http://localhost:8080/backend-portfolio/add_project.php";

      try {
        const res = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        alert(data.message);

        setModalType("");
        setEditId(null);
        setProjectData({
          name: "",
          category_name: "",
          description: "",
          tech_stack: "",
          live_url: "",
          github_url: "",
          image: null,
        });
        fetchData();
      } catch (error) {
        alert("Error saving project.");
      }
    }
  };

  const deleteData = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    let url = "";
    if (type === "description")
      url = `http://localhost:8080/backend-portfolio/delete_description.php?id=${id}`;
    if (type === "criteria")
      url = `http://localhost:8080/backend-portfolio/delete_criteria.php?id=${id}`;
    if (type === "project")
      url = `http://localhost:8080/backend-portfolio/delete_project.php?id=${id}`;

    try {
      const res = await fetch(url, { method: "GET" });
      const data = await res.json();
      alert(data.message);
      fetchData();
    } catch (error) {
      alert("Error deleting data.");
    }
  };

  const handleEdit = (type, item) => {
    setEditId(item.id);
    if (type === "description") {
      setDescription(item.description);
      setModalType("description");
    } else if (type === "criteria") {
      setCriteriaName(item.name);
      setModalType("criteria");
    } else if (type === "project") {
      setProjectData({
        name: item.name,
        category_name: item.category_name,
        description: item.description,
        tech_stack: item.tech_stack,
        live_url: item.live_url,
        github_url: item.github_url,
        image: null,
      });
      setModalType("project");
    }
  };

  const handleAddProject = () => {
    setProjectData({
      name: "",
      category_name: "",
      description: "",
      tech_stack: "",
      live_url: "",
      github_url: "",
      image: null,
    });
    setEditId(null);
    setModalType("project");
  };

  return (
    <>
      <Sidebar />
      <div className="project-page-container">
        <h2 className="project-title">Project Management</h2>

        {/* ----- Project Descriptions ----- */}
        <section className="project-section-container">
          <h4 className="save">Saved Project Descriptions</h4>
          <button className="project-action-btn" onClick={() => setModalType("description")}>
            + Add New Description
          </button>
          <br /><br />
          {loading ? (
            <p>Loading...</p>
          ) : descriptions.length > 0 ? (
            <div className="project-list1">
              {descriptions.map((desc) => (
                <div key={desc.id} className="project-card">
                  <h3>{desc.description}</h3>
                  <div className="project-card-actions">
                    <button onClick={() => handleEdit("description", desc)}><FaEdit /> Edit</button>
                    <button onClick={() => deleteData("description", desc.id)}><FaTrash /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No descriptions added yet.</p>
          )}
        </section>

        {/* ----- Criteria ----- */}
        <section className="project-section-container">
          <h4 className="save">Saved Category</h4>
          <button className="project-action-btn" onClick={() => setModalType("criteria")}>
            + Add New Category
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : criteriaList.length > 0 ? (
            <div className="project-list">
              {criteriaList.map((c) => (
                <div key={c.id} className="project-card">
                  <p>{c.name}</p>
                  <div className="project-card-actions">
                    <button onClick={() => handleEdit("criteria", c)}>Edit</button>
                    <button onClick={() => deleteData("criteria", c.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No criteria added yet.</p>
          )}
        </section>

        {/* ----- Projects ----- */}
        <section className="project-section-container">
          <h4 className="save">Saved Projects</h4>
          <button className="project-action-btn" onClick={handleAddProject}>
            + Add New Project
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : projects.length > 0 ? (
            <div className="project-list">
              {projects.map((p) => (
                <div key={p.id} className="project-card">
                  <p>
                    <strong>{p.name}</strong> | {p.category_name}
                  </p>
                  <p>{p.description}</p>
                  <p>Tech Stack: {p.tech_stack}</p>
                  <p>
                    <a href={p.live_url} target="_blank" rel="noopener noreferrer">Live</a> |{" "}
                    <a href={p.github_url} target="_blank" rel="noopener noreferrer">GitHub</a>
                  </p>
                  {p.image && (
                    <img
                      src={`http://localhost:8080/backend-portfolio/uploads/${p.image}`}
                      alt={p.name}
                      className="project-image"
                    />
                  )}
                  <div className="project-card-actions">
                    <button onClick={() => handleEdit("project", p)}>Edit</button>
                    <button onClick={() => deleteData("project", p.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No projects added yet.</p>
          )}
        </section>
      </div>

      {/* ---- Modals ---- */}
      {modalType === "description" && (
        <Modal
          title="Add Project Description"
          value={description}
          setValue={setDescription}
          onSave={() => saveData("description")}
          onClose={() => { setModalType(""); setEditId(null); }}
          placeholder="Enter project description"
        />
      )}
      {modalType === "criteria" && (
        <Modal
          title="Add New Category"
          value={criteriaName}
          setValue={setCriteriaName}
          onSave={() => saveData("criteria")}
          onClose={() => { setModalType(""); setEditId(null); }}
          placeholder="Enter Category name"
        />
      )}
      {modalType === "project" && (
        <ProjectModal
          projectData={projectData}
          setProjectData={setProjectData}
          categories={criteriaList}
          onSave={() => saveData("project")}
          onClose={() => setModalType("")}
        />
      )}
    </>
  );
};

export default Project;
