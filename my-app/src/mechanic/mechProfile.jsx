import React, { useState } from "react";
import MechNav from "../components/mechNav";
import { useMechanic } from "../context/MechanicContextProvider";

const MechanicProfile = () => {
  const initialData = {
    name: "Rajesh Patel",
    title: "Certified Vehicle Mechanic",
    email: "rajesh.patel@example.com",
    phone: "+91 9876543210",
    experience: "5 years",
    location: "Ahmedabad",
    skills: "Flat Tyre, Battery Jumpstart",
    status: "Available",
  };

  const { Mechanic, loading } = useMechanic();
  
  const [formData, setFormData] = useState(Mechanic ? Mechanic : initialData);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(Mechanic);


  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setTempData(formData);
    setEditMode(false);
  };
  const handleSave = () => {
    setFormData(tempData);
    setEditMode(false);
    console.log("Saved Data:", tempData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 ml-[240px]">
      <MechNav />
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
          RP
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{formData?.username}</h2>
          {/* <p className="text-gray-600">{formData.title}</p> */}
          <p className="text-gray-500">{formData?.location?.latitude} {formData?.location?.longitude}</p>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-xl shadow-md p-6 relative">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h3>

        {!editMode && (
          <button
            onClick={handleEdit}
            className="absolute top-4 right-4 text-sm text-white bg-orange-500 px-3 py-1 rounded hover:bg-orange-600"
          >
            Edit
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            ["Email", "email"],
            ["Phone", "number"],
            // ["Experience", "experience"],
            // ["Location", "location"],
            // ["Skills", "skills"],
            // ["Status", "status"],
          ].map(([label, name]) => (
            <div key={name}>
              <label className="text-sm text-gray-600 font-medium">{label}</label>
              <input
                type="text"
                name={name}
                value={editMode ? tempData[name] : formData[name]}
                onChange={handleChange}
                readOnly={!editMode}
                className={`w-full mt-1 px-3 py-2 rounded border text-gray-900 ${
                  editMode
                    ? "border-gray-300 focus:ring-orange-400 focus:ring-2 focus:outline-none"
                    : "bg-gray-100 border-gray-200 cursor-not-allowed"
                }`}
              />
            </div>
          ))}
        </div>

        {editMode && (
          <div className="mt-6 text-right space-x-4">
            <button
              onClick={handleSave}
              className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-black px-5 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MechanicProfile;
