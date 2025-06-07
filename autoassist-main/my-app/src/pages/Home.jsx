import React from "react";
import { Link } from "react-router-dom";
import CarsRepair from "../assets/images/cars.png";

const Home = () => {
  return (
    <div className="bg-white">
      <h2 className="text-3xl pt-5 text-right mr-5">
        Auto<span className="text-[#ed832d]">Assist</span>
      </h2>
      <div className="flex items-center justify-between bg-gradient-to-r from-white to-white">
        <div className="flex-1 pr-10 pl-20 pb-[50px] flex flex-col justify-center">
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 leading-tight text-left pl-[100px]">
            Fast Rescue.<br />Reliable Roads.
          </h1>
          <div className="mt-6 text-2xl md:text-3xl text-gray-700 font-light text-left pl-[100px]">
            <p>On the Move, With You <br />India's Trusted Towing Partner.</p>
          </div>
          <div className="mt-8 pr-[350px]">
            <Link
              to="/services"
              className="bg-[#ed832d] text-white hover:bg-white hover:text-black hover:border hover:border-black font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ml-[90px]"
            >
              Book Service
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <img
            src={CarsRepair}
            alt="Car Repair"
            className="w-full max-w-[700px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
