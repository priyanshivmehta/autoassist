import React from 'react';
import towIcon from '../assets/images/towIcon.jpg';
import lift from '../assets/images/lift.png';
import dispatch from '../assets/images/dispatch.png';
import transport from '../assets/images/transport.png';
import payment from '../assets/images/payment.png';
import locate from '../assets/images/locate.png';
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

const TowingAssistance = () => {
  const steps = [
    { label: 'Locate vehicle', icon: locate },
    { label: 'Dispatch Tow Truck', icon: dispatch },
    { label: 'Lift and Secure', icon: lift },
    { label: 'Transport to Destination', icon: transport },
    { label: 'Payment via UPI / Card', icon: payment },
  ];

  const styles = {
    phone: {
      display: "flex",
      alignItems: "center",
      fontSize: "22px",
      marginBottom: "20px",
      color: "#0056d2",
    },
    image: {
      flex: 1,
      maxWidth: "700px",
      width: "100%",
      marginTop: "2rem",
    },
    sectionTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "1rem",
    },
  };

  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .towing-section {
          padding: 20px 20px 40px 20px;
          background: #fff;
          font-family: 'Segoe UI', sans-serif;
        }

        .towing-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: auto;
        }

        .towing-left {
          flex: 1;
          min-width: 280px;
          padding: 20px;
          padding-left: 40px;
        }

        .towing-heading {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 30px;
        }

        .book-btn {
          background: black;
          color: white;
          border: none;
          padding: 14px 30px;
          border-radius: 30px;
          font-size: 18px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .book-btn:hover {
          background: #ed832d;
        }

        .towing-right {
          flex: 1;
          min-width: 280px;
          padding: 20px;
          text-align: center;
          max-width: 550px;
        }

        .towing-right img {
          width: 100%;
          max-width: 450px;
        }

        .towing-steps-section {
          max-width: 1000px;
          margin: 60px auto 0;
          text-align: center;
        }

        .towing-description {
          font-size: 17px;
          color: #555;
          margin-bottom: 40px;
        }

        .towing-steps {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
        }

        .towing-step {
          width: 160px;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .towing-step:hover {
          transform: scale(1.05);
        }

        .step-icon {
          width: 200px;
          height: 100px;
          object-fit: contain;
          margin-bottom: 16px;
          border-radius: 16px;
          background: #f9f9f9;
          padding: 14px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }

        .towing-step p {
          font-size: 17px;
          font-weight: 500;
          color: #222;
          margin-top: 8px;
          line-height: 1.4;
        }

        .auto-assist-logo {
          position: absolute;
          top: 20px;
          right: 30px;
          z-index: 10;
        }

        .logo-text {
          font-family: 'Poppins', sans-serif;
          font-size: 28px;
          font-weight: 600;
          margin: 0;
        }

        .highlight {
          color: #ed832d;
        }

        @media (max-width: 768px) {
          .logo-text {
            font-size: 20px;
          }

          .auto-assist-logo {
            top: 12px;
            right: 16px;
          }
          .towing-container {
            flex-direction: column;
            text-align: center;
          }

          .towing-left, .towing-right {
            padding: 10px;
          }

          .towing-heading {
            font-size: 34px;
          }

          .book-btn {
            font-size: 16px;
            padding: 12px 24px;
          }

          .towing-step {
            width: 120px;
          }

          .step-icon {
            width: 80px;
            height: 80px;
            padding: 10px;
          }

          .towing-step p {
            font-size: 15px;
          }
        }
      `}</style>

      <section className="towing-section">
        <div style={{ display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#fff",}}>
         <div className="auto-assist-logo">
          <h2 className="logo-text">
            Auto<span className="highlight">Assist</span>
          </h2>
        </div>
        <div className="towing-container">
          
          <div className="towing-left">
            <h1 className="towing-heading">
              24/7 Car Towing <br /> Assistance
            </h1>
            <button className="book-btn" onClick={() => navigate("/towing/book")}>
              Book Towing
            </button>
          </div>

          <div className="towing-right">
            {/* TEXT LOGO */}
            

            {/* TOW IMAGE */}
            <img src={towIcon} alt="Towing Illustration" style={styles.image} />
          </div>
        </div>

        <div className="towing-steps-section">
          <h2 style={styles.sectionTitle}>How do we do it?</h2>
          <p className="towing-description">
            Stranded on the road? No worries. Our expert towing team will reach your location quickly and transport your vehicle safely to your destination. We're just a call away, anytime.
          </p>

          <div className="towing-steps">
            {steps.map((step, idx) => (
              <div key={idx} className="towing-step">
                <img src={step.icon} alt={step.label} className="step-icon" />
                <p>{step.label}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
         <Footer />
      </section>
    </>
  );
};

export default TowingAssistance;
