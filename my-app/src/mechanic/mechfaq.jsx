import React from "react";
import MechNav from "../components/mechNav"; // Adjust the import path as necessary

const MechanicServiceRequest = () => {
  const serviceData = {
    serviceType: "Fuel Delivery",
    customerName: "Amit Sharma",
    customerPhone: "+91 9123456789",
    vehicleType: "Honda City",
    fuelType: "Petrol",
    location: "Satellite Road, Ahmedabad",
    time: "2:15 PM, June 2, 2025",
  };

  return (
    <div className="flex min-h-screen bg-[#f8f8f8] text-gray-800 ml-[180px]">
      <MechNav />
      <main className="flex-1 px-28 py-10 w-[99.5%] mx-auto">
        <h1 className="text-3xl font-bold mb-8">Incoming Service Request</h1>

        <div className="flex flex-col lg:flex-row gap-10 w-full">
          {/* Map Placeholder */}
          <div className="flex-[2.5] h-[500px] bg-gray-300 rounded-xl flex items-center justify-center text-gray-600 text-lg font-medium shadow-inner min-w-[580px]">
            Map to Customer Location
          </div>

          {/* Details Card */}
          <div className="flex-[1.5] bg-white rounded-xl shadow-md p-8 min-w-[500px]">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Service Details</h2>
            <div className="space-y-4 text-base text-gray-700">
              <p><strong>Customer:</strong> {serviceData.customerName}</p>
              <p><strong>Contact:</strong> {serviceData.customerPhone}</p>
              <p><strong>Service Type:</strong> {serviceData.serviceType}</p>
              <p><strong>Vehicle:</strong> {serviceData.vehicleType}</p>
              <p><strong>Fuel Type:</strong> {serviceData.fuelType}</p>
              <p><strong>Location:</strong> {serviceData.location}</p>
              <p><strong>Requested At:</strong> {serviceData.time}</p>
            </div>

            <button className="mt-6 w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-lg">
              Mark as Accepted
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MechanicServiceRequest;
