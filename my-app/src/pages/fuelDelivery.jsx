import React from "react";
import fuelIcon from "../assets/images/fuelIcon.png"; // Replace with actual image path
import "../styles/ServiceButton.css"; // External CSS for button styles
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

const styles = {
  mainContent: {
    flex: 1,
    padding: "0.5rem 2rem 2rem",
  },
  hero: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftColumn: {
    flex: "1",
    minWidth: "300px",
    paddingRight: "2rem",
    paddingLeft: "1.5rem",
  },
  heading: {
    fontSize: "3.2rem",
    fontWeight: "700",
    lineHeight: "1.2",
    marginBottom: "2.5rem",
    paddingTop: "1.5rem",
  },
  image: {
    flex: "1",
    maxWidth: "500px",
    width: "100%",
    marginTop: "2rem",
  },
  section: {
    textAlign: "center",
    marginTop: "4rem",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  sectionDesc: {
    color: "#666",
    maxWidth: "800px",
    margin: "0 auto 2rem",
    lineHeight: "1.6",
  },
  stepsGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
  },
  stepItem: {
    width: "160px",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#444",
  },
  iconBubble: {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.2rem",
    margin: "0 auto 0.7rem",
  },
};

function FuelDeliveryService() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#fff",
      }}
    >
      <div style={styles.mainContent}>
        <div style={{ textAlign: "right", paddingTop: "1rem", paddingRight: "1.5rem" }}>
          <h2 className="text-3xl">
            Auto<span className="text-[#ed832d]">Assist</span>
          </h2>
        </div>

        {/* Hero Section */}
        <div style={styles.hero}>
          <div style={styles.leftColumn}>
            <h1 style={styles.heading}>
              24/7 On-Demand<br />Fuel Delivery Service
            </h1>

            <button className="button-custom" onClick={() => navigate("/fuel-delivery/book")}>
              Book Service
            </button>
          </div>

          <img src={fuelIcon} alt="Fuel Delivery" style={styles.image} />
        </div>

        {/* Steps Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>How do we do it?</h2>
          <p style={styles.sectionDesc}>
            Ran out of fuel in the middle of nowhere? We’ve got your back with our 24/7 fuel delivery service.
            Just call us, and we’ll be there quickly with the right fuel for your vehicle.
          </p>

          <div style={styles.stepsGrid}>
            {[
              { text: "Receive location via call or app", icon: "📍" },
              { text: "Confirm fuel type (Petrol/Diesel)", icon: "⛽" },
              { text: "Reach within minutes", icon: "🚚" },
              { text: "Safely refill your tank", icon: "🛢️" },
              { text: "Provide mileage & fuel tips", icon: "📘" },
            ].map((step, idx) => (
              <div key={idx} style={styles.stepItem}>
                <div style={styles.iconBubble}>{step.icon}</div>
                {step.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FuelDeliveryService;
