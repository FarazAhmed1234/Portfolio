import React from "react";
import Navbar from "./Navbar";

import "./About.css";

const About = () => {
  return (
    <>
    <Navbar />
    <section id="about" className="about-section">
      <h2>About Me</h2>
      <p>
        I'm Faraz Ahmed, a dedicated web developer skilled in React, PHP, and MySQL. 
        I enjoy creating clean, modern, and functional web applications. 
        My goal is to keep learning and improve my skills while building 
        projects that make a real impact.
      </p>
      <div className="about-details">
        <p><strong>Skills:</strong> React, JavaScript, PHP, MySQL, HTML, CSS</p>
        <p><strong>Experience:</strong> Freelance & Academic Projects</p>
      </div>
    </section>


    </>
  );
};

export default About;
