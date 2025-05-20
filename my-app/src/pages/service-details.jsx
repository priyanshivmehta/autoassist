import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ServiceDetailsPage = () => {
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Get selected service from localStorage
    const selectedService = JSON.parse(localStorage.getItem("selectedService"));
    if (!selectedService) {
      navigate("/browse-services"); // Redirect if no service selected
    } else {
      setService(selectedService);
    }
  }, [navigate]);

  const handleConfirm = () => {
    // Simulate confirmation (you can call an API here)
    alert(`Service requested: ${service.name}`);

    // Save confirmation status if needed
    localStorage.setItem("serviceConfirmed", "true");

    // Redirect to tracking page
    navigate("/tracking");
  };

  if (!service) return <p>Loading service details...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: "1.5rem", border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{service.name}</h2>
      <p><strong>Contact:</strong> {service.contact}</p>
      <p><strong>Price Estimate:</strong> {service.price}</p>
      <p><strong>Estimated Arrival:</strong> 15 minutes</p>
      <p style={{ marginBottom: "1.5rem" }}>{service.description}</p>

      <button
        onClick={handleConfirm}
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        Confirm Request
      </button>
    </div>
  );
};

export default ServiceDetailsPage;
