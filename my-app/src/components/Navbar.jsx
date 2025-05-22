// import React, { useState } from "react";

// const Menu = () => {
//   const [isHovered, setIsHovered] = useState(false);

//   const menuItems = [
//     { icon: "home", label: "Home",path: "/" },
//     // { icon: "dashboard", label: "DashBoard" },
//     // { icon: "explore", label: "Explore" },
//     // { icon: "analytics", label: "Analytics" },
//     // { icon: "settings", label: "Settings" },
//     // { icon: "person", label: "Account" },
//     // { icon: "report", label: "Report" },
//     // { icon: "email", label: "Contact" },
//     { icon: "logout", label: "Login", path: "/login" },
//   ];

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full overflow-y-scroll no-scrollbar transition-all duration-300 p-5 pl-0 shadow-lg backdrop-blur-sm bg-gradient-to-b from-white via-gray-150 to-gray-100`}
//       style={{ width: isHovered ? "260px" : "85px" }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <ul className="flex flex-col">
//         {menuItems.map((item, index) => (
//           <li
//             key={index}
//             className="mb-5 rounded-r-full pl-5 transition-all duration-300 hover:bg-gray-300"
//           >
//             <a
//               href="#"
//               className="flex items-center text-gray-700 font-sans no-underline"
//             >
//               <span className="material-symbols-outlined p-2 text-[25px] mr-3 rounded-full bg-black text-white"              >
//                 {item.icon}
//               </span>
//               {isHovered && <span>{item.label}</span>}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Menu;



import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link

const Menu = () => {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { icon: "home", label: "Home", path: "/" },
    { icon: "dashboard", label: "DashBoard" },
    { icon: "explore", label: "Subscription", path: "/subscription" },
    { icon: "analytics", label: "Services", path: "/services" },
    { icon: "settings", label: "Settings" },
    { icon: "person", label: "Account" },
    { icon: "report", label: "Review", path: "/review" },
    { icon: "email", label: "Contact" },
    { icon: "logout", label: "Logout", path: "/login" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full overflow-y-scroll no-scrollbar transition-all duration-300 p-5 pl-0 shadow-lg backdrop-blur-sm bg-gradient-to-b from-white via-gray-200 to-gray-100`}
      style={{ width: isHovered ? "260px" : "85px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ul className="flex flex-col">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="mb-5 rounded-r-full pl-5 transition-all duration-300 hover:bg-gray-300"
          >
            <Link
              to={item.path}
              className="flex items-center text-gray-700 font-sans no-underline"
            >
              <span className="material-symbols-outlined p-2 text-[25px] mr-3 rounded-full bg-black text-white">
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
