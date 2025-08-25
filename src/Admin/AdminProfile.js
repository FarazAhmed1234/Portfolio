import React from "react";
import "./AdminProfile.css";
import Sidebar from "./Sidebar";

const Profile = () => {
  const user = {
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    joined: "August 2025",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <>
      <Sidebar />
      <div className="page-container">
        <h2>Profile</h2>
        <div className="profile-card">
          <img src={user.avatar} alt="Profile Avatar" />
          <div className="profile-info">
            <h3>{user.name}</h3>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Role:</b> {user.role}</p>
            <p><b>Joined:</b> {user.joined}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
