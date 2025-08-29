import React, { useState, useEffect } from "react";
import "./Services.css";
import Navbar from "./Navbar";
import * as FaIcons from "react-icons/fa"; // import all icons

const Services = () => {
  const [services, setServices] = useState([]);
  const [subtitle, setSubtitle] = useState("");

  // --- Fetch subtitle from backend ---
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getserviesDescription.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.description) setSubtitle(data.description);
      })
      .catch((err) => console.error("Error fetching description:", err));
  }, []);

  // --- Icon mapping for 20+ services ---
  const iconMap = {
    web: FaIcons.FaCode,
    design: FaIcons.FaPalette,
    mobile: FaIcons.FaMobileAlt,
    seo: FaIcons.FaSearch,
    marketing: FaIcons.FaBullhorn,
    backend: FaIcons.FaDatabase,
    frontend: FaIcons.FaLaptopCode,
    cloud: FaIcons.FaCloud,
    ui: FaIcons.FaDraftingCompass,
    ux: FaIcons.FaUser,
    commerce: FaIcons.FaShoppingCart,
    analytics: FaIcons.FaChartLine,
    security: FaIcons.FaShieldAlt,
    support: FaIcons.FaHeadset,
    ai: FaIcons.FaRobot,
    blockchain: FaIcons.FaCube,
    consulting: FaIcons.FaUsers,
    content: FaIcons.FaFileAlt,
    testing: FaIcons.FaCheckCircle,
    database: FaIcons.FaServer
  };

  // --- Function to get icon by service name ---
  const getIconByName = (name) => {
    if (!name) return FaIcons.FaCheck; // default fallback
    const lower = name.toLowerCase();
    for (const key in iconMap) {
      if (lower.includes(key)) return iconMap[key];
    }
    return FaIcons.FaCheck; // fallback
  };

  // --- Fetch services from backend ---
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/getServices.php")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  return (
    <>
      <Navbar />

      {/* Subtitle Section */}
      <section className="services-section">
        <h2 className="services-title">
          My <span>Services</span>
        </h2>
        <p className="services-subtitle">{subtitle}</p>
      </section>

      {/* Services Cards */}
      <section className="services-section">
        <div className="services-container">
          {services.map((service, index) => {
            const IconComponent = getIconByName(service.name);
            return (
              <div className="service-card" key={index}>
                <div className="service-icon"><IconComponent /></div>
                <h3>{service.name}</h3>
                <p className="service-desc">{service.description}</p>
                {service.features && service.features.length > 0 && (
                  <ul className="service-features">
                    {service.features.map((feature, i) => (
                      <li key={i}>
                        <FaIcons.FaCheck className="check-icon" /> {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <button className="service-btn" 
          onClick={() => (window.location.href = "/contact")}>Get Started →</button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Start Project Section */}
      <section className="start-project">
        <h2>Ready to Start Your Project?</h2>
        <p>Let's discuss your project requirements and create something amazing together.</p>
        <a href="/contact" className="consult-btn">Get Free Consultation →</a>
      </section>
    </>
  );
};

export default Services;
