import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const topRowServices = [
  {
    name: "Towing",
    path: "/towing",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 13h2l1.5-2h3l2 2h4v-2l3-3h2v5" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M5 17h2" />
        <path d="M15 17h2" />
      </svg>
    ),
  },
  {
    name: "Flat Tyre",
    path: "/flat-tyre",
    icon: (
      <svg width="24" height="24" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    name: "Battery Jumpstart",
    path: "/battery-jumpstart",
    icon: (
      <svg width="24" height="24" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M6 7v-2h2v2h8v-2h2v2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h1z" />
        <path d="M11 11h2v3h-2z" />
      </svg>
    ),
  },
];

const bottomRowServices = [
  {
    name: "Starting Problem",
    path: "/starting-problem",
    icon: (
      <svg width="24" height="24" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M9 12h6" />
      </svg>
    ),
  },
  {
    name: "Key Unlock Assistance",
    path: "/key-unlock-assistance",
    icon: (
      <svg width="24" height="24" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M7 14l5-5 2 2-5 5H7v-2z" />
        <circle cx="18" cy="6" r="3" />
      </svg>
    ),
  },
  {
    name: "Fuel Delivery",
    path: "/fuel-delivery",
    icon: (
      <svg width="24" height="24" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M16 3h5v6h-5zM3 11h13v9H3zM16 14v-1a1 1 0 0 1 1-1h2v4" />
      </svg>
    ),
  },
];

function RoadsideAssistance() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 lg:px-10 py-5">
      <div className="text-right">
        <h2 className="text-3xl mb-2 ml-[700px]">
          Auto<span className="text-[#ed832d]">Assist</span>
        </h2>
      </div>

      <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-800">
        Roadside Assistance
      </h1>

      <p className="text-center max-w-3xl mx-auto text-gray-600 text-lg mb-10">
        Stranded on the road? We've got you covered. Our professional roadside
        services ensure help is just a tap away. From towing and tyre issues to
        battery jumpstarts and emergency fuel delivery, our team is ready to
        assist 24/7.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 ml-[50px] lg:px-24">
        {topRowServices.map((service) => (
          <Link to={service.path} key={service.name}>
            <div className="bg-white border border-gray-200 hover:border-[#ed832d] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 p-8 flex flex-col items-center text-center">
              <div className="mb-5">{service.icon}</div>
              <div className="text-xl font-semibold text-black">
                {service.name}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ml-[50px] lg:px-24 pb-10">
        {bottomRowServices.map((service) => (
          <Link to={service.path} key={service.name}>
            <div className="bg-white border border-gray-200 hover:border-[#ed832d] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 p-8 flex flex-col items-center text-center">
              <div className="mb-5">{service.icon}</div>
              <div className="text-xl font-semibold text-gray-800">
                {service.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default RoadsideAssistance;
