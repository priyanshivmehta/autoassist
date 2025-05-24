import React, { useState } from "react";
import AdminNav from "../components/AdminNav";

const mechanicsList = ["Mechanic A", "Mechanic B", "Mechanic C"];

const serviceRequestsData = [
  {
    id: 1,
    user: "John Doe",
    location: "Surat",
    service: "Towing",
    status: "Pending",
    assignedMechanic: "",
    timestamp: "2025-05-23 14:30",
  },
  {
    id: 2,
    user: "Priya Sharma",
    location: "Ahmedabad",
    service: "Flat Tire Fix",
    status: "In Progress",
    assignedMechanic: "Mechanic A",
    timestamp: "2025-05-22 10:15",
  },
  {
    id: 3,
    user: "Ravi Mehta",
    location: "Baroda",
    service: "Battery Jumpstart",
    status: "Completed",
    assignedMechanic: "Mechanic B",
    timestamp: "2025-05-21 09:45",
  },
];

const AdminRequests = () => {
  const [requests, setRequests] = useState(serviceRequestsData);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchText, setSearchText] = useState("");

  const handleStatusChange = (e) => setFilterStatus(e.target.value);
  const handleSearchChange = (e) => setSearchText(e.target.value.toLowerCase());

  const handleAssign = (id, mechanic) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, assignedMechanic: mechanic } : req
      )
    );
  };

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: action } : req
      )
    );
  };

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = filterStatus === "All" || req.status === filterStatus;
    const matchesSearch =
      req.user.toLowerCase().includes(searchText) ||
      req.location.toLowerCase().includes(searchText);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 pl-[260px] bg-gray-100 min-h-screen">
      <AdminNav />
      <h1 className="text-3xl mb-6 text-gray-800">Service Request Management</h1>

      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by user or location"
          value={searchText}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/2"
          style={{ boxShadow: "0 0 0 0px #ed832d33" }}
        />
        <select
          value={filterStatus}
          onChange={handleStatusChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          style={{ boxShadow: "0 0 0 0px #ed832d33" }}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
  <table className="min-w-full divide-y divide-gray-200 text-sm">
    <thead style={{ backgroundColor: "#ed832d", color: "white" }}>
      <tr>
        <th className="px-3 py-2 text-left font-gray-700 font-medium">User</th>
        <th className="px-3 py-2 text-left font-semibold">Location</th>
        <th className="px-3 py-2 text-left font-semibold">Service</th>
        <th className="px-3 py-2 text-left font-semibold">Timestamp</th>
        <th className="px-3 py-2 text-left font-semibold">Status</th>
        <th className="px-3 py-2 text-left font-semibold">Mechanic</th>
        <th className="px-3 py-2 text-left font-semibold">Logs</th>
        <th className="px-3 py-2 text-center font-semibold">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {filteredRequests.length === 0 ? (
        <tr>
          <td colSpan="8" className="text-center py-3 text-gray-500 text-sm">
            No service requests found.
          </td>
        </tr>
      ) : (
        filteredRequests.map((req) => (
          <tr key={req.id} className="hover:bg-gray-50">
            <td className="px-3 py-2 whitespace-nowrap">{req.user}</td>
            <td className="px-3 py-2 whitespace-nowrap">{req.location}</td>
            <td className="px-3 py-2 whitespace-nowrap">{req.service}</td>
            <td className="px-3 py-2 whitespace-nowrap">{req.timestamp}</td>
            <td className="px-3 py-2 whitespace-nowrap">
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  req.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : req.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : req.status === "Cancelled"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {req.status}
              </span>
            </td>
            <td className="px-3 py-2 whitespace-nowrap">
              <select
                value={req.assignedMechanic}
                onChange={(e) => handleAssign(req.id, e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md text-xs"
              >
                <option value="">-- Assign --</option>
                {mechanicsList.map((mech) => (
                  <option key={mech} value={mech}>
                    {mech}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-3 py-2 text-gray-500 italic text-xs">
              {req.status === "In Progress"
                ? "En route"
                : req.status === "Completed"
                ? "Done"
                : req.status === "Cancelled"
                ? "Cancelled"
                : "Awaiting"}
            </td>
            <td className="px-3 py-2 whitespace-nowrap text-center space-x-1">
              {req.status !== "Completed" && req.status !== "Cancelled" && (
                <button
                  onClick={() => handleAction(req.id, "Completed")}
                  className="px-2 py-1 rounded text-xs text-white"
                  style={{ backgroundColor: "#16a34a" }}
                >
                  Complete
                </button>
              )}
              {req.status !== "Cancelled" && req.status !== "Completed" && (
                <button
                  onClick={() => handleAction(req.id, "Cancelled")}
                  className="px-2 py-1 rounded text-xs text-white"
                  style={{ backgroundColor: "#dc2626" }}
                >
                  Cancel
                </button>
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
};

export default AdminRequests;
