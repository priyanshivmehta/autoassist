import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";
import { FaUser, FaTools, FaSignOutAlt, FaTruck, FaClipboardList } from "react-icons/fa";
import AdminNav from "../components/AdminNav";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  const menuItems = [
    { icon: "dashboard", label: "Dashboard" },
    { icon: "settings", label: "Service Request" },
    { icon: "person", label: "Mechanics" },
    { icon: "email", label: "Contact" },
    { icon: "logout", label: "Logout", path: "/login" },
  ];

  return (
    <div className="admin-dashboard-container">
    {/* <AdminNav /> */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">
          Auto
          <span className={`text-[#ed832d]`}>Assist</span>
        </h2>
        <nav className={`fixed left-0 h-full overflow-y-scroll no-scrollbar transition-all duration-300 p-3 pl-0 shadow-lg backdrop-blur-sm bg-gradient-to-b from-black via-black to-black`}>
          <ul className="flex flex-col">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="mb-5 rounded-r-full pl-5 transition-all duration-300 hover:bg-black-300"
          >
            <Link
              to={item.path}
              className="flex items-center text-white font-sans no-underline"
            >
              <span className="material-symbols-outlined p-2 text-[25px] mr-3 rounded-full bg-white text-black">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Welcome, Admin!</h1>
          <p>Here's an overview of your system.</p>
        </header>

        <section className="admin-stats">
          <div className="stat-card">
            <h3>Total Requests</h3>
            <p className="colors">124</p>
          </div>
          <div className="stat-card">
            <h3>Available Trucks</h3>
            <p className="colors">18</p>
          </div>
          <div className="stat-card">
            <h3>Active Mechanics</h3>
            <p className="colors">12</p>
          </div>
          <div className="stat-card">
            <h3>Registered Users</h3>
            <p className="colors">305</p>
          </div>
        </section>

        <section className="admin-recent">
          <h2>Recent Service Requests</h2>
          <table className="recent-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>Surat</td>
                <td>Pending</td>
                <td>2025-05-20</td>
              </tr>
              <tr>
                <td>Priya Sharma</td>
                <td>Ahmedabad</td>
                <td>Completed</td>
                <td>2025-05-19</td>
              </tr>
              <tr>
                <td>Ravi Mehta</td>
                <td>Baroda</td>
                <td>In Progress</td>
                <td>2025-05-18</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
