import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const menuItems = [
    { icon: "dashboard", label: "Dashboard", path: "/admin/dashboard" },
    { icon: "assignment", label: "Service Requests", path: "/admin/ServiceRequest" },
    { icon: "construction", label: "Mechanics", path: "/admin/mechanic" },
    { icon: "star", label: "Reviews", path: "/admin/reviews" },
    { icon: "account_circle", label: "Users", path: "/admin/users" },
    { icon: "paid", label: "Subscriptions", path: "/admin/subscription" },
    { icon: "settings", label: "settings", path: "/admin/settings"},
    { icon: "logout", label: "Logout", path: "/admin/Adminlogin", action: handleLogout },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-50 p-3 pl-0 shadow-lg backdrop-blur-sm bg-gradient-to-b from-black via-black to-black overflow-y-auto no-scrollbar">
      <h2 className="text-white text-2xl mb-6 px-5 ml-10 mt-3">
        Auto<span className="text-[#ed832d]">Assist</span>
      </h2>
      <nav>
        <ul className="flex flex-col">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="mb-2 rounded-r-full pl-5 hover:bg-gray-800 transition-all duration-300"
            >
              <Link
                to={item.path}
                onClick={item.action}
                className="flex items-center text-white font-sans no-underline px-3 py-2"
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
  );
};

export default AdminSidebar;