import React from "react";
import batteryIcon from "../assets/images/batteryIcon.png"; // Replace with actual image path
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

const styles = {
  wrapper: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#fff",
    minHeight: "100vh", // Full height of viewport
    display: "flex",
    flexDirection: "column", // Vertical stack
  },
  content: {
    flexGrow: 1, // Fill remaining space to push footer down
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
  button: {
    padding: "0.8rem 1.8rem",
    fontSize: "1rem",
    backgroundColor: "black",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#ed832d",
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

function BatteryJumpstartService() {
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);

  return (
  <div style={{ display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#fff",}}>
    <div style={styles.wrapper}>
      <div style={styles.content}>
        <div style={styles.logoContainer}>
          <h2 className="text-3xl pt-5 text-right mr-5">
            Auto<span className="text-[#ed832d]">Assist</span>
          </h2>
        </div>

        <div style={styles.hero}>
          <div style={styles.leftColumn}>
            <h1 style={styles.heading}>
              24/7 Battery
              <br />
              Jumpstart Service
            </h1>

            <button
              style={{
                ...styles.button,
                ...(hover ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => navigate("/battery-jumpstart/book")}
            >
              Book Service
            </button>
          </div>

          <img
            src={batteryIcon}
            alt="Battery Jumpstart"
            style={styles.image}
          />
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>How do we do it?</h2>
          <p style={styles.sectionDesc}>
            Stranded with a dead battery? Our 24/7 jumpstart service gets you
            back on the road quickly and safely. We bring the equipment,
            expertise, and fast response you need — anytime, anywhere.
          </p>

          <div style={styles.stepsGrid}>
            {[
              { text: "Inspect the battery & terminals", icon: "🔋" },
              { text: "Connect professional jumper kit", icon: "⚡" },
              { text: "Start the vehicle safely", icon: "🚗" },
              { text: "Check alternator & battery health", icon: "🧪" },
              { text: "Provide battery care tips", icon: "💡" },
            ].map((step, idx) => (
              <div key={idx} style={styles.stepItem}>
                <div style={styles.iconBubble}>{step.icon}</div>
                {step.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
}

export default BatteryJumpstartService;
