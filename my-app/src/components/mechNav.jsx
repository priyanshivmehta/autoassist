



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
    { to: "/admin/Adminlogin", icon: <LogOut size={25} />, label: "Logout" },
  ];

  return (
    <div>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-60 p-3 pl-0 shadow-lg backdrop-blur-sm bg-gradient-to-b from-black via-black to-black overflow-y-auto no-scrollbar">
        <h2 className="text-white text-2xl mb-6 px-5 ml-10 mt-3">
         Auto<span className="text-[#ed832d]">Assist</span>
       </h2>
        <nav>
          <ul className="flex flex-col">
            {navItems.map(({ to, icon, label }, index) => (
              <li
                key={index}
                className="mb-2 rounded-r-full pl-5 hover:bg-gray-800 transition-all duration-300"
              >
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center text-white font-sans no-underline px-3 py-2 rounded-full transition-all ${
                      isActive ? "bg-gray-800" : ""
                    }`
                  }
                >
                  <span className="p-2 text-[25px] mr-3 rounded-full bg-white text-black">
                    {icon}
                  </span>
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MechNav;
