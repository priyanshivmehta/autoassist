import React from 'react';
import towIcon from '../assets/images/towIcon.jpg';
import lift from '../assets/images/lift.png';
import dispatch from '../assets/images/dispatch.png';
import transport from '../assets/images/transport.png';
import payment from '../assets/images/payment.png';
import locate from '../assets/images/locate.png';

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
      color: "#0056d2", // <-- Unified color for both "Call Us :" and number
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

        @media (max-width: 768px) {
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
        <div className="towing-container">
          <div className="towing-left">
            <h1 className="towing-heading">
              24/7 Car Towing <br /> Assistance
            </h1>

            <div style={styles.phone}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "0.5rem" }}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 5.18
                  2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.81.37 1.6.73 2.34a2 2 0 0 1-.45
                  2.18l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1
                  2.18-.45c.74.36 1.53.61 2.34.73a2 2 0 0 1 1.72 2z" />
              </svg>
              Call Us : <a href="tel:8197852852" style={{ color: "#0056d2", marginLeft: "4px" }}>8299 342 121</a>
            </div>

            <button className="book-btn" onClick={() => alert("Service Booked!")}>
              Book Towing
            </button>
          </div>

          <div className="towing-right">
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
      </section>
    </>
  );
};

export default TowingAssistance;
