import React from "react";
import Navbar from "./Navbar";

import "./Home.css";

const Home = () => {
  return (
    <>
          <Navbar />

    
    <section id="home" className="home-section">
      <div className="home-content">
        <h1>Hi, I'm <span>Faraz Ahmed</span></h1>
        <p>A passionate Web Developer who loves building modern web applications.</p>
        <a href="#portfolio" className="btn">View Projects</a>
      </div>
    </section>

    </>
  );
};

export default Home;
