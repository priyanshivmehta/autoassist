import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Star,
  Info,
  LogOut,
} from "lucide-react";

const MechNav = () => {
  const navItems = [
    { to: "/mechanic/dashboard", icon: <LayoutDashboard size={25} />, label: "Dashboard" },
    { to: "/mechanic/profile", icon: <User size={25} />, label: "Profile" },
    { to: "/mechanic/reviews", icon: <Star size={25} />, label: "Reviews" },
    { to: "/mechanic/faqs", icon: <Info size={25} />, label: "Help" },
    { to: "/logout", icon: <LogOut size={25} />, label: "Logout" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-56 bg-black text-white p-4 flex flex-col">
        <div className="text-center text-2xl font-bold mb-8">
          Auto<span className="text-orange-500">Assist</span>
        </div>
        <nav className="flex flex-col space-y-2">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-full transition-colors ${
                  isActive ? "bg-gray-800 text-white" : "hover:bg-gray-700 text-white"
                }`
              }
            >
              <div className="bg-white text-black rounded-full p-1">{icon}</div>
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      {/* <div className="flex-1 bg-white overflow-y-auto"> */}
        <Outlet />
      {/* </div> */}
    </div>
  );
};

export default MechNav;
