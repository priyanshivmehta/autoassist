import React, { useState } from "react";

const plans = {
  monthly: [
    {
      title: "Basic",
      price: "Free",
      features: ["Standard Towing", "24/7 Support", "5 Service Requests/Month"],
      button: "Current Plan",
      isPremium: false,
    },
    {
      title: "Premium",
      price: "$9.99/month",
      features: ["Unlimited Requests", "Priority Dispatch", "Discounts on Services", "Dedicated Support"],
      button: "Subscribe Now",
      isPremium: true,
    },
  ],
  yearly: [
    {
      title: "Basic",
      price: "Free",
      features: ["Standard Towing", "24/7 Support", "5 Service Requests/Month"],
      button: "Current Plan",
      isPremium: false,
    },
    {
      title: "Premium",
      price: "$99.99/year",
      features: ["Unlimited Requests", "Priority Dispatch", "Discounts on Services", "Dedicated Support"],
      button: "Subscribe Now",
      isPremium: true,
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
    // Here you can add your backend integration or API call
    console.log("Advertisement form submitted:", formData);
    setSubmitted(true);
  }

  return (
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

      <div className="grid md:grid-cols-2 gap-8 mb-16 mr-[100px] ml-[170px]">
        {plans[billingCycle].map((plan, index) => (
          <div
            key={index}
            className={`p-6 border rounded-xl shadow-md bg-white ${
              plan.isPremium ? "border-black" : "border-gray-300"
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
            <p className="text-xl font-semibold mb-4">{plan.price}</p>
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
            <button type="submit" className="w-full py-2 px-4 bg-black 600 text-white rounded">
              Submit
            </button>
          </form>
        )}
      </div>

      
<footer className="bg-gray-900 text-white py-10 px-6 mt-10 ">
  <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
    {/* Company Info */}
    <div>
      <h3 className="text-xl font-bold mb-2">ByteForge</h3>
      <p className="text-sm text-gray-300">
        24/7 vehicle care and roadside assistance partner for bikes & cars across India
      </p>
      <p className="mt-4 text-sm text-gray-400">
        <strong>Corporate Office</strong><br />
        839/2, 24th Main Rd, Behind Thirumala Theatre,<br />
        1st Sector, HSR Layout, Bengaluru, Karnataka 560102
      </p>
    </div>

    {/* Reach Us */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Reach Us</h3>
      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          📞 <a href="tel:1234567890" className="hover:underline">1234567890</a>
        </div>
        <div className="flex items-center gap-2">
          📞 <a href="tel:7022012201" className="hover:underline">70 2201 2201 (CNGFirst)</a>
        </div>
        <div className="flex items-center gap-2">
          📧 <a href="mailto:hello@byteforge.in" className="hover:underline">hello@byteforge.in</a>
        </div>
      </div>
    </div>

    {/* Company Links */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Company</h3>
      <ul className="space-y-1 text-sm text-gray-300">
        <li><a href="#" className="hover:underline">Contact Us</a></li>
        <li><a href="#" className="hover:underline">About Us</a></li>
        <li><a href="#" className="hover:underline">Career</a></li>
        <li><a href="#" className="hover:underline">News</a></li>
        <li><a href="#" className="hover:underline">Blogs</a></li>
      </ul>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
      <ul className="space-y-1 text-sm text-gray-300">
        <li><a href="#" className="hover:underline">My Subscriptions</a></li>
        <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
        <li><a href="#" className="hover:underline">Prime Terms & Conditions</a></li>
        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
      </ul>
    </div>
  </div>

  <div className="mt-10 text-center text-xs text-gray-500">
    © {new Date().getFullYear()} ByteForge. All rights reserved.
  </div>
</footer>
    </div>
    
  );
};

export default SubscriptionPage;
