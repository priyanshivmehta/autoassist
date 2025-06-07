import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/mechStyle.css";
import MechNav from "../components/mechNav";

const MechanicDashboard = () => {
  const navigate = useNavigate();

  const [rejectedJobs, setRejectedJobs] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleAccept = () => {
    navigate("/mechanic/faqs");
  };

  const handleReject = (index) => {
    setRejectedJobs((prev) => [...prev, index]);
  };

  const jobs = [
    {
      service: "Flat Tyre",
      location: "Surat",
      status: "New",
      date: "2025-05-28",
    },
    {
      service: "Battery Jumpstart",
      location: "Ahmedabad",
      status: "Pending",
      date: "2025-05-27",
    },
    {
      service: "Fuel Delivery",
      location: "Baroda",
      status: "Completed",
      date: "2025-05-25",
    },
  ];

  return (
    <div>
      <MechNav />
    <div className="admin-dashboard-container">
      <main className="admin-main">
        <header className="admin-header">
          <h1 style={{ fontWeight: "bold" }}>Welcome, Mechanic!</h1>
          <p>Here’s your service dashboard.</p>
        </header>

        <section className="admin-stats">
          <div className="stat-card">
            <h3>New Requests</h3>
            <p className="colors">3</p>
          </div>
          <div className="stat-card">
            <h3>Pending Jobs</h3>
            <p className="colors">2</p>
          </div>
          <div className="stat-card">
            <h3>Completed Jobs</h3>
            <p className="colors">5</p>
          </div>
        </section>

        <section className="admin-recent">
          <h2>Current Service Jobs</h2>
          <table className="recent-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => {
                const isRejected = rejectedJobs.includes(index);
                return (
                  <tr
                    key={index}
                    style={{ textDecoration: isRejected ? "line-through" : "none", color: isRejected ? "#999" : "inherit" }}
                  >
                    <td>{job.service}</td>
                    <td>{job.location}</td>
                    <td>{job.status}</td>
                    <td>{job.date}</td>
                    <td>
                      {job.status !== "Completed" && !isRejected ? (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={handleAccept}
                            style={{
                              padding: "4px 10px",
                              backgroundColor: "#28a745",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(index)}
                            style={{
                              padding: "4px 10px",
                              backgroundColor: "#dc3545",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: "#666" }}>--</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </div>
    </div>
  );
};

export default MechanicDashboard;
