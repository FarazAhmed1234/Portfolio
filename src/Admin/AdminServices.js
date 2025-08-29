import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "./AdminProject.css";
import "./AdminServices.css";


// ---- Modal for Descriptions ----
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

// ---- Modal for Service with multiple fields ----
const ServiceModal = ({ serviceData, setServiceData, onSave, onClose }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...serviceData.points];
    newPoints[index] = value;
    setServiceData({ ...serviceData, points: newPoints });
  };

  const addPoint = () => {
    if (serviceData.points.length < 4) {
      setServiceData({ 
        ...serviceData, 
        points: [...serviceData.points, ""] 
      });
    }
  };

  const removePoint = (index) => {
    if (serviceData.points.length > 1) {
      const newPoints = [...serviceData.points];
      newPoints.splice(index, 1);
      setServiceData({ ...serviceData, points: newPoints });
    }
  };

  return (
    <div className="project-modal">
      <div className="project-modal-content">
        <h3>Add / Edit Service</h3>

        <input
          type="text"
          name="name"
          value={serviceData.name}
          onChange={handleChange}
          placeholder="Service Name"
          className="project-input"
        />

        <textarea
          name="short_description"
          value={serviceData.short_description}
          onChange={handleChange}
          placeholder="Short Description"
          className="project-textarea"
        />

        <div className="points-container">
          <label>Service Points (Exactly 4 required)</label>
          {serviceData.points.map((point, index) => (
            <div key={index} className="point-input-group">
              <input
                type="text"
                value={point}
                onChange={(e) => handlePointChange(index, e.target.value)}
                placeholder={`Point ${index + 1}`}
                className="project-input"
              />
              {serviceData.points.length > 1 && (
                <button 
                  type="button" 
                  className="remove-point-btn"
                  onClick={() => removePoint(index)}
                >
                  <FaMinus />
                </button>
              )}
            </div>
          ))}
          {serviceData.points.length < 4 && (
            <button type="button" className="add-point-btn" onClick={addPoint}>
              <FaPlus /> Add Point
            </button>
          )}
        </div>

        <div className="project-modal-actions">
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Project = () => {
  const [modalType, setModalType] = useState(""); // description, service
  const [editId, setEditId] = useState(null);

  // Input States
  const [description, setDescription] = useState("");
  const [serviceData, setServiceData] = useState({
    name: "",
    short_description: "",
    points: ["", "", "", ""] // Exactly 4 points
  });

  // Display States
  const [descriptions, setDescriptions] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch service descriptions
      const descRes = await fetch(
        "http://localhost:8080/backend-portfolio/get_service_descriptions.php"
      );
      setDescriptions(await descRes.json());

      // Fetch services
      const servicesRes = await fetch(
        "http://localhost:8080/backend-portfolio/get_services.php"
      );
      setServices(await servicesRes.json());
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
        ? "http://localhost:8080/backend-portfolio/update_service_description.php"
        : "http://localhost:8080/backend-portfolio/add_service_description.php";
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
    } else if (type === "service") {
      // Validate service data
      if (!serviceData.name.trim()) return alert("Service name is required");
      if (!serviceData.short_description.trim()) return alert("Short description is required");
      
      // Validate exactly 4 points
      if (serviceData.points.length !== 4) {
        return alert("Exactly 4 points are required for each service");
      }
      
      // Check if any point is empty
      const emptyPoint = serviceData.points.find(point => !point.trim());
      if (emptyPoint) return alert("All service points must be filled");
      
      const payload = { 
        ...serviceData, 
        id: editId,
        points: JSON.stringify(serviceData.points) // Convert array to JSON string for DB storage
      };
      
      const url = editId
        ? "http://localhost:8080/backend-portfolio/update_service.php"
        : "http://localhost:8080/backend-portfolio/add_service.php";

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
        setServiceData({
          name: "",
          short_description: "",
          points: ["", "", "", ""]
        });
        fetchData();
      } catch (error) {
        alert("Error saving service.");
      }
    }
  };

  const deleteData = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    let url = "";
    if (type === "description")
      url = `http://localhost:8080/backend-portfolio/delete_service_description.php?id=${id}`;
    if (type === "service")
      url = `http://localhost:8080/backend-portfolio/delete_service.php?id=${id}`;

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
    } else if (type === "service") {
      // Parse points if they're stored as JSON string
      const points = typeof item.points === 'string' 
        ? JSON.parse(item.points) 
        : item.points;
      
      // Ensure we have exactly 4 points
      const paddedPoints = [...points];
      while (paddedPoints.length < 4) {
        paddedPoints.push("");
      }
      
      setServiceData({
        name: item.name,
        short_description: item.short_description,
        points: paddedPoints
      });
      setModalType("service");
    }
  };

  const handleAddService = () => {
    setServiceData({
      name: "",
      short_description: "",
      points: ["", "", "", ""]
    });
    setEditId(null);
    setModalType("service");
  };

  return (
    <>
      <Sidebar />
      <div className="project-page-container">
        <h2 className="project-title">Services Management</h2>

        {/* ----- Service Descriptions ----- */}
        <section className="project-section-container">
          <h4 className="save">Saved Service Descriptions</h4>
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

        {/* ----- Services ----- */}
        <section className="project-section-container">
          <h4 className="save">Saved Services</h4>
          <button className="project-action-btn" onClick={handleAddService}>
            + Add New Service
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : services.length > 0 ? (
            <div className="project-list">
              {services.map((s) => {
                // Parse points if they're stored as JSON string
                const points = typeof s.points === 'string' 
                  ? JSON.parse(s.points) 
                  : s.points;
                
                return (
                  <div key={s.id} className="project-card">
                    <p><strong>{s.name}</strong></p>
                    <p>{s.short_description}</p>
                    <ul className="service-points">
                      {points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                    <div className="project-card-actions">
                      <button onClick={() => handleEdit("service", s)}>Edit</button>
                      <button onClick={() => deleteData("service", s.id)}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No services added yet.</p>
          )}
        </section>
      </div>

      {/* ---- Modals ---- */}
      {modalType === "description" && (
        <Modal
          title="Add Service Description"
          value={description}
          setValue={setDescription}
          onSave={() => saveData("description")}
          onClose={() => { setModalType(""); setEditId(null); }}
          placeholder="Enter service description"
        />
      )}
      {modalType === "service" && (
        <ServiceModal
          serviceData={serviceData}
          setServiceData={setServiceData}
          onSave={() => saveData("service")}
          onClose={() => setModalType("")}
        />
      )}
    </>
  );
};

export default Project;