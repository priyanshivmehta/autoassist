import React, { useState } from "react";
import AdminNav from "../components/AdminNav"; // Adjust the import path as necessary

const initialMechanics = [
  {
    id: 1,
    name: "John Doe",
    serviceArea: "Downtown",
    truckAssigned: "Truck-01",
    servicesCompleted: 28,
    rating: 4.6,
  },
  {
    id: 2,
    name: "Jane Smith",
    serviceArea: "Uptown",
    truckAssigned: "Truck-03",
    servicesCompleted: 35,
    rating: 4.8,
  },
];

export default function MechanicManagement() {
  const [mechanics, setMechanics] = useState(initialMechanics);
  const [newMechanic, setNewMechanic] = useState({
    name: "",
    serviceArea: "",
    truckAssigned: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editedMechanic, setEditedMechanic] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddMechanic = () => {
    if (!newMechanic.name || !newMechanic.serviceArea || !newMechanic.truckAssigned) return;
    setMechanics([
      ...mechanics,
      {
        id: mechanics.length + 1,
        ...newMechanic,
        servicesCompleted: 0,
        rating: 0,
      },
    ]);
    setNewMechanic({ name: "", serviceArea: "", truckAssigned: "" });
  };

  const handleDelete = (id) => {
    setMechanics(mechanics.filter((mech) => mech.id !== id));
  };

  const handleEdit = (id) => {
    const mech = mechanics.find((m) => m.id === id);
    setEditingId(id);
    setEditedMechanic({ ...mech });
  };

  const handleSave = (id) => {
    setMechanics(
      mechanics.map((mech) => (mech.id === id ? { ...mech, ...editedMechanic } : mech))
    );
    setEditingId(null);
    setEditedMechanic({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedMechanic({});
  };

  const filteredMechanics = mechanics.filter((mech) =>
    mech.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen md:pl-[140px] md:pr-[140px]">
      <AdminNav />
      <h2 className="text-3xl mb-6 text-gray-800 md:pl-[120px]">Mechanic Management</h2>

      <div className="p-4 md:ml-[105px] space-y-3 w-full max-w-screen-xl">
        <h3 className="font-semibold">Add New Mechanic</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
          <input
            type="text"
            placeholder="Name"
            className="w-full sm:w-72 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={newMechanic.name}
            onChange={(e) => setNewMechanic({ ...newMechanic, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Service Area"
            className="w-full sm:w-72 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={newMechanic.serviceArea}
            onChange={(e) => setNewMechanic({ ...newMechanic, serviceArea: e.target.value })}
          />
          <input
            type="text"
            placeholder="Truck Assigned"
            className="w-full sm:w-72 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={newMechanic.truckAssigned}
            onChange={(e) => setNewMechanic({ ...newMechanic, truckAssigned: e.target.value })}
          />
          <button
            onClick={handleAddMechanic}
            className="md:col-span-3 bg-black hover:bg-[#ed832d] transition-colors duration-300 text-white rounded sm:w-60 px-3 py-2 font-semibold"
          >
            Add Mechanic
          </button>
        </div>
      </div>

      {/* Mechanics List */}
      <div className="flex flex-col md:flex-row justify-between items-center ml-[122px] pb-4 max-w-screen-xl">
        <h3 className="font-semibold">All Mechanics</h3>
        <input
          type="text"
          placeholder="Search by name..."
          className="flex items-right w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow md:ml-[120px] md:mr-[40px] w-full max-w-screen-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead style={{ backgroundColor: "#ed832d", color: "#ffffff" }}>
            <tr>
              <th className="px-3 py-2 text-left text-sm font-semibold">Name</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Service Area</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Truck Assigned</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Services Completed</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Rating</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMechanics.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No mechanics found.
                </td>
              </tr>
            ) : (
              filteredMechanics.map((mech) => (
                <tr key={mech.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap">
                    {editingId === mech.id ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={editedMechanic.name}
                        onChange={(e) => setEditedMechanic({ ...editedMechanic, name: e.target.value })}
                      />
                    ) : (
                      mech.name
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {editingId === mech.id ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={editedMechanic.serviceArea}
                        onChange={(e) => setEditedMechanic({ ...editedMechanic, serviceArea: e.target.value })}
                      />
                    ) : (
                      mech.serviceArea
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {editingId === mech.id ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={editedMechanic.truckAssigned}
                        onChange={(e) => setEditedMechanic({ ...editedMechanic, truckAssigned: e.target.value })}
                      />
                    ) : (
                      mech.truckAssigned
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{mech.servicesCompleted}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{mech.rating.toFixed(1)}</td>
                  <td className="px-3 py-2 text-center space-x-2 flex">
                    {editingId === mech.id ? (
                      <>
                        <button
                          className="bg-green-600 text-white rounded w-full px-3 py-1 text-sm font-semibold hover:bg-green-700 hover:transition-all duration-300 ease-in-out"
                          onClick={() => handleSave(mech.id)}
                        >
                          Save
                        </button>
                        <button
                          className="border border-gray-400 rounded w-full px-3 py-1 text-sm font-semibold hover:bg-gray-100 hover:transition-all duration-300 ease-in-out"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-black text-white rounded w-full px-3 py-1 text-sm font-semibold hover:bg-gray-700 hover:transition-all duration-300 ease-in-out"
                          onClick={() => handleEdit(mech.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white rounded w-full px-3 py-1 text-sm font-semibold hover:bg-red-700 hover:transition-all duration-300 ease-in-out"
                          onClick={() => handleDelete(mech.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
