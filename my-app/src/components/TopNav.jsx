import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center px-10 pt-4 shadow-md bg-white">
      {/* Empty div to push content to right */}
      <div />

      {/* Right section */}
      <div className="flex items-center space-x-4 ml-auto">
        {!isLoggedIn && (
          <button
            onClick={() => setIsLoggedIn(true)}
            className="bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black font-semibold py-2 px-6 rounded-full transition duration-300"
          >
            Login
          </button>
        )}
        <div className="text-2xl font-bold text-black">
          <Link to="/">AutoAssist</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
