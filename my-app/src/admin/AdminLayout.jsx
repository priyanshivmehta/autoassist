// AdminLayout.jsx
import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <main className="admin-main">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
