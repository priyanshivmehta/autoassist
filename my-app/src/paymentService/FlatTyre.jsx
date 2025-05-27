import React, { useState } from "react";

const ServicePayment = () => {
  const [language, setLanguage] = useState("English");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [tyreInfo, setTyreInfo] = useState({
    front: false,
    rear: false,
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");

  const handleTyreChange = (type) => {
    setTyreInfo((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div style={{ backgroundColor: "#f0f4f8", padding: "30px" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Header with branding */}
        <div
          style={{
            backgroundColor: "#1c2634",
            color: "white",
            padding: "20px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "24px" }}>
            Auto<span style={{ color: "#ed832d" }}>Assist</span>
          </h2>
          <div style={{ textAlign: "right" }}>
            <h3 style={{ margin: "0 0 4px 0", fontWeight: 500 }}>Service Payment</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                fontSize: "14px",
                color: "black",
              }}
            >
              <option value="English">English</option>
              <option value="Hindi">हिन्दी</option>
            </select>
          </div>
        </div>

        <div className="section" style={{ padding: "20px" }}>
          <p>Base Price: ₹180</p>
          <p>GST (20%): ₹20</p>
          <p style={{ fontWeight: "bold" }}>
            Total: <span style={{ color: "#111" }}>₹200</span>
          </p>
        </div>

        {/* Phone Number Section */}
        <div className="section" style={{ padding: "20px" }}>
          <h4>{language === "English" ? "Phone Number" : "फोन नंबर"}</h4>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>9876543210</span>
            <button style={{ padding: "6px 12px", borderRadius: "6px", border: "2px solid black" }}>
              {language === "English" ? "Change" : "बदलें"}
            </button>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="section" style={{ padding: "20px" }}>
          <h4>{language === "English" ? "Vehicle Details" : "वाहन विवरण"}</h4>
          <select
            className="input"
            style={{
              marginBottom: "10px",
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              color: "black",
            }}
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="">{language === "English" ? "Select Vehicle Type" : "वाहन प्रकार चुनें"}</option>
            <option value="car">{language === "English" ? "Car" : "कार"}</option>
            <option value="bike">{language === "English" ? "Bike" : "बाइक"}</option>
          </select>
          <input
            className="input"
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            placeholder={language === "English" ? "Enter Vehicle Number" : "वाहन नंबर दर्ज करें"}
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
        </div>

        {/* Tyre Info */}
        <div className="section" style={{ padding: "20px" }}>
          <h4>{language === "English" ? "Tyre Info" : "टायर जानकारी"}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label>
              <input
                type="checkbox"
                checked={tyreInfo.front}
                onChange={() => handleTyreChange("front")}
                style={{ marginRight: "8px" }}
              />
              {language === "English" ? "Front Tyre Puncture" : "सामने का टायर पंचर"}
            </label>
            <label>
              <input
                type="checkbox"
                checked={tyreInfo.rear}
                onChange={() => handleTyreChange("rear")}
                style={{ marginRight: "8px" }}
              />
              {language === "English" ? "Rear Tyre Puncture" : "पीछे का टायर पंचर"}
            </label>
          </div>
        </div>

        {/* Payment Section */}
        <div className="section" style={{ padding: "20px" }}>
          <h4>{language === "English" ? "Payment Method" : "भुगतान का तरीका"}</h4>
          <select
            className="input"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              color: "black",
            }}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="card">{language === "English" ? "Credit/Debit Card" : "क्रेडिट/डेबिट कार्ड"}</option>
            <option value="upi">{language === "English" ? "UPI" : "यूपीआई"}</option>
            <option value="cash">{language === "English" ? "Cash" : "नकद"}</option>
          </select>
        </div>

        {/* Card Details */}
        {paymentMethod === "card" && (
          <div className="section" style={{ padding: "20px" }}>
            <h4>{language === "English" ? "Card Details" : "कार्ड विवरण"}</h4>
            <input className="input" placeholder="First Name" style={inputStyle} />
            <input className="input" placeholder="Last Name" style={inputStyle} />
            <input className="input" placeholder="Card Number" style={inputStyle} />
            <div style={{ display: "flex", gap: "10px" }}>
              <input className="input" placeholder="MM/YY" style={inputStyle} />
              <input className="input" placeholder="CVV" style={inputStyle} />
            </div>
          </div>
        )}

        {/* UPI ID Field */}
        {paymentMethod === "upi" && (
          <div className="section" style={{ padding: "20px" }}>
            <h4>{language === "English" ? "Enter your UPI ID" : "अपना यूपीआई आईडी दर्ज करें"}</h4>
            <input
              className="input"
              placeholder="example@upi"
              style={inputStyle}
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {/* Cash Message */}
        {paymentMethod === "cash" && (
          <div className="section" style={{ padding: "20px" }}>
            <h4>{language === "English" ? "Payment Info" : "भुगतान जानकारी"}</h4>
            <p>{language === "English" ? "You can directly pay to the service provider." : "आप सीधे सेवा प्रदाता को भुगतान कर सकते हैं।"}</p>
          </div>
        )}

        <div style={{ padding: "20px" }}>
          <button
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#1c2634",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {language === "English" ? "Confirm Booking" : "बुकिंग की पुष्टि करें"}
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export default ServicePayment;
