import React, { useState } from "react";
import Footer from "../components/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const plans = {
  monthly: [
    {
      title: "Basic",
      price: "Free",
      features: ["Standard Towing", "24/7 Support", "5 Service Requests/Month"],
      button: "Current Plan",
      isPremium: false,
      amount: 0
    },
    {
      title: "Premium",
      price: "Rs 399/month",
      features: ["Unlimited Requests", "Priority Dispatch", "Discounts on Services", "Dedicated Support"],
      button: "Subscribe Now",
      isPremium: true,
      amount: 399
    },
  ],
  yearly: [
    {
      title: "Basic",
      price: "Free",
      features: ["Standard Towing", "24/7 Support", "5 Service Requests/Month"],
      button: "Current Plan",
      isPremium: false,
      amount: 0
    },
    {
      title: "Premium",
      price: "Rs 1999/year",
      features: ["Unlimited Requests", "Priority Dispatch", "Discounts on Services", "Dedicated Support"],
      button: "Subscribe Now",
      isPremium: true,
      amount: 1999
    },
  ],
};

const businessTypes = [
  "Truck Repair Shop",
  "Tire Service",
  "Fuel Station / Delivery",
  "Insurance Provider",
  "Spare Parts Supplier",
  "Roadside Cafe / Rest Stop",
  "Logistics / Freight",
  "Medical / Safety Gear",
  "Other",
];

const SubscriptionPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();

  // Advertisement Form State
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    contactPerson: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Advertisement form submitted:", formData);
    setSubmitted(true);
  }

  const handlePayment = async (amount) => {
    try {
      // First get the Razorpay key
      const keyResponse = await axios.get("http://localhost:3000/api/getkey");
      const razorpayKey = keyResponse.data.key;

      // Then create the order
      const { data } = await axios.post("http://localhost:3000/api/payment/checkout", {
        amount: amount
      });

      const options = {
        key: razorpayKey,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "AutoAssist",
        description: "Premium Subscription",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
            const verificationResponse = await axios.post("http://localhost:3000/api/payment/paymentverification", {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            });
            
            // If verification is successful, redirect to success page
            if (verificationResponse.data.success) {
              window.location.href = `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`;
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#000000"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("Failed to initialize payment. Please try again.");
    }
  };

  return (
    <div className={`bg-white`}>
    <h2 className="text-3xl pt-5 text-right mr-5">
          Auto
          <span className={`text-[#ed832d]`}>Assist</span>
        </h2>
    <div className="min-h-screen flex flex-col bg-white">
      {/* Subscription Plans Section */}
      <h2 className="text-4xl font-bold text-center mb-8 mt-10">Choose Your Plan</h2>

      <div className="flex justify-center mb-8 ">
        <button
          className={`px-4 py-2 rounded-l-md ${
            billingCycle === "monthly" ? "bg-black text-white" : "bg-white border"
          }`}
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 rounded-r-md ${
            billingCycle === "yearly" ? "bg-black text-white" : "bg-white border"
          }`}
          onClick={() => setBillingCycle("yearly")}
        >
          Yearly
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 mb-16">
      {plans[billingCycle].map((plan, index) => (
        <div
          key={index}
          className={`flex-1 max-w-md w-full p-6 border rounded-xl shadow-md bg-white ${
            plan.isPremium ? "border-[#ed832d]" : "border-gray-300"
          }`}
        >
          <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
          <p className="text-xl text-[#ed832d] font-semibold mb-4">{plan.price}</p>
          <ul className="mb-6 space-y-2">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="text-gray-700">
                ✔️ {feature}
              </li>
            ))}
          </ul>
          <button
            className={`w-full py-2 px-4 rounded-md ${
              plan.isPremium ? "bg-black text-white" : "bg-gray-300 text-gray-600"
            }`}
            onClick={() => plan.isPremium && handlePayment(plan.amount)}
          >
            {plan.button}
          </button>
        </div>
      ))}
    </div>


      {/* Advertisement Collaboration Form Section */}
      <div className="p-6 bg-white rounded-xl border border-gray-300 shadow-2xl max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Advertise With Us</h2>
        <p className="mb-6 text-gray-700 text-center">
          Collaborate with us to promote your business to the trucking community. Fill the form below to get started.
        </p>

        {submitted ? (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
            <p>We have received your request and will contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              required
              className="w-full border p-2 rounded"
            />
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="" disabled>
                Select Business Type
              </option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Contact Person"
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full border p-2 rounded"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your advertising goals (optional)"
              className="w-full border p-2 rounded"
              rows={4}
            />
            <button type="submit" className="w-full py-2 px-4 bg-black 600 text-white rounded hover:bg-[#ed832d] transition duration-300">
              Submit
            </button>
          </form>
        )}
      </div>

      
<Footer />
    </div>
    </div>
  );
}

export default SubscriptionPage;