import React from "react";
import keyIcon from "../assets/images/keyIcon.png";
<<<<<<< HEAD
=======
import "../styles/ServiceButton.css"; // ✅ Import the CSS file
>>>>>>> 1d6f5fb4eabf16a0b39319e695880da055b9cf5c

const styles = {
  wrapper: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#fff",
    padding: "3rem 1rem",
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

function KeyUnlockService() {
  return (
    <div style={styles.wrapper}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.leftColumn}>
          <h1 style={styles.heading}>
            24/7 Bike & Car<br />Key Unlock Assistance
          </h1>

          <div style={styles.phone}>
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
              style={{ marginRight: "0.5rem" }}
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.81.37 1.6.73 2.34a2 2 0 0 1-.45 2.18l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.18-.45c.74.36 1.53.61 2.34.73a2 2 0 0 1 1.72 2z" />
            </svg>
            Call Us : <a href="tel:8197852852" style={{ color: "#0056d2" }}>8299 342 121</a>
          </div>

          {/* ✅ Button now uses CSS class for hover effect */}
          <button
            className="button-custom"
            onClick={() => alert("Service Booked!")}
          >
            Book Service
          </button>
        </div>

        <img src={keyIcon} alt="Unlock Assistance" style={styles.image} />
      </div>

      {/* How Do We Do It Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>How do we do it?</h2>
        <p style={styles.sectionDesc}>
          Locked out of your vehicle? Don’t worry, we have got you covered with our key unlock assistance service!
          Our skilled technicians are equipped with specialized tools to quickly and safely unlock your vehicle's.
          Contact us for hassle-free key unlock assistance whenever you need it.
        </p>

        <div style={styles.stepsGrid}>
          {[
            { text: "Check RC & customer ID", icon: "🚗" },
            { text: "Fix the key issue", icon: "🔧" },
            { text: "Test drive the vehicle", icon: "🧪" },
            { text: "Provide maintenance tips & recommendations", icon: "💡" },
            { text: "We accept payment through online, PayTM, UPI etc", icon: "💳" },
          ].map((step, idx) => (
            <div key={idx} style={styles.stepItem}>
              <div style={styles.iconBubble}>{step.icon}</div>
              {step.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KeyUnlockService;
