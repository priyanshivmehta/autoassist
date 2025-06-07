import React from "react";
import startIcon from "../assets/images/startIcon.png"; // Add an appropriate image
import "../styles/ServiceButton.css"; // ✅ Added external CSS for hover effect
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

const styles = {
  wrapper: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#fff",
    padding: "0.5rem 2rem 6rem",
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
  phone: {
    fontSize: "1.7rem",
    marginBottom: "2.2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#0056d2",
    fontWeight: "500",
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

function VehicleStartService() {
   const navigate = useNavigate();
  return (
    <div style={{ display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#fff",}}>
    <div style={styles.wrapper}>
      <div style={styles.logoContainer}>
        <h2 className="text-3xl pt-5 text-right mr-5">
          Auto<span className="text-[#ed832d]">Assist</span>
        </h2>
      </div>  
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.leftColumn}>
          <h1 style={styles.heading}>
            24/7 Vehicle<br />Starting Assistance
          </h1>

          <button
            className="button-custom" // ✅ Use class instead of inline style
            onClick={() => navigate("/start-problem/book")}
          >
            Book Service
          </button>
        </div>

        <img src={startIcon} alt="Vehicle Start" style={styles.image} />
      </div>

      {/* Steps Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>How do we do it?</h2>
        <p style={styles.sectionDesc}>
          Having trouble starting your car or bike? Our technicians are just a call away to get your vehicle up and running,
          whether it's a battery, ignition, or starter issue. Fast, reliable, and professional.
        </p>

        <div style={styles.stepsGrid}>
          {[
            { text: "Diagnose the starting issue", icon: "🔍" },
            { text: "Check battery & ignition system", icon: "🔋" },
            { text: "Use jumpstart or external starter", icon: "⚡" },
            { text: "Ensure engine starts properly", icon: "🚗" },
            { text: "Give expert guidance for future", icon: "🛠️" },
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

export default VehicleStartService;
