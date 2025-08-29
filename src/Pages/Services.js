import React from "react";
import "./Services.css";
import Navbar from "./Navbar";
import { FaCode, FaPalette, FaMobileAlt, FaCheck } from "react-icons/fa";

const Services = () => {
    const services = [
    {
      icon: <FaCode />,
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies like React, TypeScript, and Node.js.",
      features: [
        "Responsive Design",
        "Fast Performance",
        "SEO Optimized",
        "Modern Tech Stack",
      ],
      price: "$2,500",
    },
    {
      icon: <FaPalette />,
      title: "UI/UX Design",
      description:
        "User-centered design that creates beautiful, intuitive interfaces that users love to interact with.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      price: "$1,500",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications that provide seamless user experiences.",
      features: [
        "iOS & Android",
        "React Native",
        "App Store Deployment",
        "Push Notifications",
      ],
      price: "$3,500",
    },
  ];
  return (
    <>
    <Navbar />
    <section className="services-section">
      <h2 className="services-title">
        My <span>Services</span>
      </h2>
      <p className="services-subtitle">
        Professional web development and design services to help your business
        grow and succeed online.
      </p>
    </section>
    
 <section className="services-section">
     
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p className="service-desc">{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, i) => (
                <li key={i}>
                  <FaCheck className="check-icon" /> {feature}
                </li>
              ))}
            </ul>
            <p className="service-price">Starting at {service.price}</p>
            <button className="service-btn">Get Started →</button>
          </div>
        ))}
      </div>
    </section>

     <section className="start-project">
      <h2>Ready to Start Your Project?</h2>
      <p>
        Let's discuss your project requirements and create something amazing
        together.
      </p>
      <a href="/contact" className="consult-btn">
        Get Free Consultation →
      </a>
    </section>
  </>
  );
};

export default Services;
