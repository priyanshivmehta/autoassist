import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link

const Menu = () => {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { icon: "home", label: "Home", path: "/" },
    { icon: "dashboard", label: "Fleet Management" },
    { icon: "settings", label: "Service Request" },
    { icon: "person", label: "Mechanics" },
    { icon: "email", label: "Contact" },
    { icon: "logout", label: "Logout", path: "/login" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full overflow-y-scroll no-scrollbar transition-all duration-300 p-5 pl-0 shadow-lg backdrop-blur-sm bg-gradient-to-b from-black via-black to-black`}
      style={{ width: isHovered ? "260px" : "85px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
              {isHovered && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
