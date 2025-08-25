import React from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Welcome to Faraz Ahmed</h1>
      </div>
    </div>
  );
}

export default AdminDashboard;
