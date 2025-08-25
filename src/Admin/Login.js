import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/backend-portfolio/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Login Successful!");
        // Save user data (optional)
        localStorage.setItem("admin", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleBackToPortfolio = () => {
    navigate("/");
  };

  return (
    <div className="admin-login-container">
      <button className="back-to-portfolio-btn" onClick={handleBackToPortfolio}>
        <FaArrowLeft /> Back to Portfolio
      </button>

      <div className="login-box">
        <div className="login-icon">
          <FaLock />
        </div>

        <h2>Admin Login</h2>
        <p>Access your portfolio dashboard</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
