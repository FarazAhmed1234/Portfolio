import React, { useState, useEffect } from "react";
import "./ContactPage.css";
import Navbar from "./Navbar";
import { FiMail, FiPhone, FiMapPin, FiX } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [toasts, setToasts] = useState([]);
  const [info, setInfo] = useState({ Email: "", Phone: "", Location: "" });
  const [socialLinks, setSocialLinks] = useState({});

  // Fetch contact info
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/get_info.php")
      .then(res => res.json())
      .then(data => { if (data.success) setInfo(data.data); })
      .catch(err => console.error(err));
  }, []);

  // Fetch social links
  useEffect(() => {
    fetch("http://localhost:8080/backend-portfolio/faraz/get_social_links.php")
      .then(res => res.json())
      .then(data => { if (data.success) setSocialLinks(data.data); })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Show toast notification
  const showToast = (type, title, message, extraInfo = "") => {
    const id = new Date().getTime();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setToasts(prev => [...prev, { id, type, title, message, extraInfo, timestamp }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/backend-portfolio/faraz/save_message.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        showToast(
          "success",
          "Message Sent!",
          result.message,
          "I'll get back to you within 24-48 hours. Connect on social media meanwhile."
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        showToast(
          "error",
          "Oops! Something went wrong",
          result.message,
          "Try again or contact directly via email."
        );
      }
    } catch (error) {
      showToast(
        "error",
        "Network Error",
        "Please check your internet connection.",
        "Network unavailable, try later."
      );
    }
  };

  const closeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <>
      <Navbar />
      <section className="contact-section">
        <div className="contact-header">
          <h1>Let's Build Something Great</h1>
          <p>Tell me about your idea. I'll reply within 24–48 hours.</p>
        </div>

        <div className="contact-container">
          {/* Left: Form */}
          <div className="contact-form">
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Briefly describe your project..."
                required
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>

          {/* Right: Info */}
          <div className="contact-info">
            <div className="info-box">
              <h3>Get in Touch</h3>
              <div className="contact-item">
                <FiMail className="icon" />
                <div>
                  <h4>Email</h4>
                  <p>{info.Email}</p>
                </div>
              </div>
              <div className="contact-item">
                <FiPhone className="icon" />
                <div>
                  <h4>Phone</h4>
                  <p>{info.Phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <FiMapPin className="icon" />
                <div>
                  <h4>Location</h4>
                  <p>{info.Location}</p>
                </div>
              </div>
            </div>

            <div className="social-box">
              <h3>Connect on Social</h3>
              <div className="social-links">
                {socialLinks.LinkedIn && (
                  <a href={socialLinks.LinkedIn} target="_blank" rel="noreferrer">
                    <FaLinkedin className="icon" /> LinkedIn
                  </a>
                )}
                {socialLinks.GitHub && (
                  <a href={socialLinks.GitHub} target="_blank" rel="noreferrer">
                    <FaGithub className="icon" /> GitHub
                  </a>
                )}
                {socialLinks.Twitter && (
                  <a href={socialLinks.Twitter} target="_blank" rel="noreferrer">
                    <FaTwitter className="icon" /> Twitter
                  </a>
                )}

                 {info.Email && (
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${info.Email}&su=Let's Connect&body=Hi, I would like to discuss a project.`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FiMail className="icon" /> Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notifications */}
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={`toast ${toast.type}`}>
              <div className="toast-content">
                <div className="toast-header">
                  <strong>{toast.title}</strong>
                  <span className="toast-time">{toast.timestamp}</span>
                </div>
                <p>{toast.message}</p>
                {toast.extraInfo && <p className="toast-extra">{toast.extraInfo}</p>}
              </div>
              <button className="close-btn" onClick={() => closeToast(toast.id)}>
                <FiX />
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Contact;
