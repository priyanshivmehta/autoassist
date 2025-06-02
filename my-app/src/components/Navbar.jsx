import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { icon: "home", label: "Home", path: "/" },
    { icon: "person", label: "Account" },
    { icon: "paid", label: "Subscription", path: "/subscription" },
    { icon: "analytics", label: "Services", path: "/services" },
    { icon: "star", label: "Review", path: "/review" },
  ];

  const logoutItem = { icon: "logout", label: "Logout", path: "/login" };

  return (
    <div
      className={`fixed top-0 left-0 h-full overflow-y-auto no-scrollbar transition-all duration-300 p-5 pl-0 shadow-lg backdrop-blur-sm bg-gradient-to-b from-white via-gray-200 to-gray-100`}
      style={{ width: isHovered ? "260px" : "85px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Top Menu Items */}
        <ul className="flex flex-col py-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="mb-5 rounded-r-full pl-5 transition-all duration-300 hover:bg-gray-300"
            >
              <Link
                to={item.path}
                className="flex items-center text-gray-700 font-sans no-underline py-2"
              >
                <span className="material-symbols-outlined p-2 text-[25px] mr-3 rounded-full bg-black text-white">
                  {item.icon}
                </span>
                {isHovered && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="border-t border-gray-300 pt-4 mt-4">
          <Link
            to={logoutItem.path}
            className="flex items-center text-gray-700 font-sans no-underline hover:bg-gray-300 rounded-r-full py-2 pr-2 pl-5 transition-all duration-300"
          >
            <span className="material-symbols-outlined p-2 text-[25px] mr-3 rounded-full bg-black text-white">
              {logoutItem.icon}
            </span>
            {isHovered && <span>{logoutItem.label}</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
