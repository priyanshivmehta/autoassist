import React from "react";
import { Link } from "react-router-dom";
import "../styles/RoadsideAssistance.css";

const topRowServices = [
  {
    name: "Towing",
    path: "/towing",
    icon: (
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
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
    <div className="card-container">
      <h1 className="title">Roadside Assistance</h1>

      <div className="grid">
        {topRowServices.map((service) => (
          <div className="service-card" key={service.name}>
            <Link to={service.path}>
              <span className="emoji">{service.icon}</span>
              <span className="text">{service.name}</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="grid">
        {bottomRowServices.map((service) => (
          <div className="service-card" key={service.name}>
            <Link to={service.path}>
              <span className="emoji">{service.icon}</span>
              <span className="text">{service.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadsideAssistance;
