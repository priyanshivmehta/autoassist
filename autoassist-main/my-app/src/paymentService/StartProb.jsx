import React, { useState } from "react";

const PaymentPage = () => {
  const [language, setLanguage] = useState("English");
  const [phone, setPhone] = useState("9876543210");
  const [paymentMethod, setPaymentMethod] = useState("Credit/Debit Card");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const translations = {
    English: {
      servicePayment: "Service Payment",
      basePrice: "Base Price: ₹80",
      gst: "GST (20%): ₹20",
      total: "Total: ₹100",
      phoneNumber: "Phone Number",
      change: "Change",
      paymentMethod: "Payment Method",
      cardDetails: "Card Details",
      firstName: "First Name",
      lastName: "Last Name",
      cardNumber: "Card Number",
      expiryMonth: "Expiry Month (MM)",
      expiryYear: "Expiry Year (YYYY)",
      cvv: "CVV",
      upiDetails: "UPI Details",
      upiPlaceholder: "Enter your UPI ID (e.g., yourname@upi)",
      cashPayment: "Cash Payment",
      cashInstruction: "You can pay directly in cash to the service provider.",
      confirmBooking: "Confirm Booking",
      cancel: "Cancel",
    },
    हिन्दी: {
      servicePayment: "सेवा भुगतान",
      basePrice: "मूल मूल्य: ₹80",
      gst: "जीएसटी (20%): ₹20",
      total: "कुल: ₹100",
      phoneNumber: "फ़ोन नंबर",
      change: "बदलें",
      paymentMethod: "भुगतान का तरीका",
      cardDetails: "कार्ड विवरण",
      firstName: "पहला नाम",
      lastName: "अंतिम नाम",
      cardNumber: "कार्ड नंबर",
      expiryMonth: "समाप्ति माह (MM)",
      expiryYear: "समाप्ति वर्ष (YYYY)",
      cvv: "सीवीवी",
      upiDetails: "यूपीआई विवरण",
      upiPlaceholder: "अपना यूपीआई आईडी दर्ज करें (जैसे yourname@upi)",
      cashPayment: "नकद भुगतान",
      cashInstruction: "आप सेवा प्रदाता को सीधे नकद में भुगतान कर सकते हैं।",
      confirmBooking: "बुकिंग की पुष्टि करें",
      cancel: "रद्द करें",
    },
  };

  const t = translations[language];

  const handleConfirmBooking = () => {
    alert(language === "English" ? "Booking Confirmed!" : "बुकिंग की पुष्टि हो गई!");
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        {/* Header with logo */}
        <div className="header flex justify-between items-center">
          <h2 className="text-2xl pt-2 ml-2 mb-0">
            Auto<span className="text-[#ed832d]">Assist</span>
          </h2>
          <div className="flex flex-col items-end">
            <h2 className="m-0">{t.servicePayment}</h2>
            <select
              className="lang-dropdown"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>हिन्दी</option>
            </select>
          </div>
        </div>

        {/* Price Summary */}
        <div className="summary">
          <div className="summary-item">{t.basePrice}</div>
          <div className="summary-item">{t.gst}</div>
          <div className="summary-total">{t.total}</div>
        </div>

        {/* Phone number */}
        <div className="section">
          <h4>{t.phoneNumber}</h4>
          <div className="edit-phone">
            <div>{phone}</div>
            <button
              className="btn outline small"
              onClick={() =>
                setPhone(prompt(language === "English" ? "Enter new phone number:" : "नया फ़ोन नंबर दर्ज करें:", phone))
              }
            >
              {t.change}
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="section">
          <h4>{t.paymentMethod}</h4>
          <select
            className="input"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Credit/Debit Card</option>
            <option>UPI</option>
            <option>Cash</option>
          </select>
        </div>

        {/* Card Payment */}
        {paymentMethod === "Credit/Debit Card" && (
          <div className="section">
            <h4>{t.cardDetails}</h4>
            <input
              className="input"
              placeholder={t.firstName}
              value={cardDetails.firstName}
              onChange={(e) => setCardDetails({ ...cardDetails, firstName: e.target.value })}
            />
            <input
              className="input"
              placeholder={t.lastName}
              value={cardDetails.lastName}
              onChange={(e) => setCardDetails({ ...cardDetails, lastName: e.target.value })}
            />
            <input
              className="input"
              placeholder={t.cardNumber}
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                className="input"
                style={{ flex: 1 }}
                placeholder={t.expiryMonth}
                value={cardDetails.expiryMonth}
                onChange={(e) => setCardDetails({ ...cardDetails, expiryMonth: e.target.value })}
              />
              <input
                className="input"
                style={{ flex: 1 }}
                placeholder={t.expiryYear}
                value={cardDetails.expiryYear}
                onChange={(e) => setCardDetails({ ...cardDetails, expiryYear: e.target.value })}
              />
            </div>
            <input
              className="input"
              placeholder={t.cvv}
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            />
          </div>
        )}

        {/* UPI Payment */}
        {paymentMethod === "UPI" && (
          <div className="section">
            <h4>{t.upiDetails}</h4>
            <input
              className="input"
              placeholder={t.upiPlaceholder}
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {/* Cash Payment */}
        {paymentMethod === "Cash" && (
          <div className="section">
            <h4>{t.cashPayment}</h4>
            <p>{t.cashInstruction}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="section row">
          <button className="btn" onClick={handleConfirmBooking}>
            {t.confirmBooking}
          </button>
          <button className="btn outline">{t.cancel}</button>
        </div>
      </div>

      {/* Inline CSS */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        .payment-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: #f1f5f9;
          padding: 40px 20px;
          font-family: 'Segoe UI', sans-serif;
        }

        .payment-box {
          background: white;
          width: 100%;
          max-width: 800px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }

        .header {
          background: #1e293b;
          color: white;
          padding: 24px 32px;
        }

        .lang-dropdown {
          padding: 6px;
          border-radius: 6px;
          border: none;
          color: black;
        }

        .summary {
          padding: 24px 32px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .summary-item {
          margin-bottom: 6px;
          color: #334155;
        }

        .summary-total {
          font-weight: bold;
          font-size: 18px;
          color: #0f172a;
        }

        .section {
          padding: 24px 32px;
          border-bottom: 1px solid #e2e8f0;
        }

        .input {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          margin-bottom: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
        }

        .row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .btn {
          background-color: black;
          color: white;
          padding: 10px 18px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn:hover {
          background-color: #f97316;
        }

        .btn.outline {
          background-color: white;
          color: black;
          border: 1px solid black;
        }

        .btn.outline:hover {
          background-color: #f97316;
          color: white;
          border-color: #f97316;
        }

        .btn.small {
          padding: 6px 12px;
          font-size: 13px;
          width: auto;
          min-width: 80px;
        }

        .edit-phone {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }

        @media (max-width: 600px) {
          .payment-box {
            border-radius: 0;
            box-shadow: none;
          }

          .header, .summary, .section {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;
