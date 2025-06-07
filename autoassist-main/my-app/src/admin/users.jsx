import React, { useState } from "react";
import AdminNav from "../components/AdminNav";

const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    city: "Surat",
    subscription: "Premium",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9123456789",
    city: "Ahmedabad",
    subscription: "Free",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Ravi Mehta",
    email: "ravi@example.com",
    phone: "+91 9988776655",
    city: "Baroda",
    subscription: "Premium",
    status: "Active",
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("All");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterPlan(e.target.value);
  };

  const handleToggleStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPlan = filterPlan === "All" || user.subscription === filterPlan;

    return matchesSearch && matchesPlan;
  });

  return (
    <div className="p-6 pl-[270px] bg-gray-100 min-h-screen">
      <AdminNav />
      <h1 className="text-3xl mb-6 text-gray-800">Users Management</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name or city"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          style={{ boxShadow: "0 0 0 0px " }}
        />

        <select
          value={filterPlan}
          onChange={handleFilterChange}
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          style={{ boxShadow: "0 0 0 0px " }}
        >
          <option value="All">All Plans</option>
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead style={{ backgroundColor: "#ed832d", color: "#ffffff" }}>
            <tr>
              <th className="px-3 py-2 text-left text-sm font-semibold">Name</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Email</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Phone</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">City</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Subscription</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Status</th>
              <th className="px-3 py-2 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-3 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap text-gray-700 font-medium">{user.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-700">{user.email}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-700">{user.phone}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-700">{user.city}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-700">{user.subscription}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`px-3 py-1 rounded-md text-sm font-semibold text-white`}
                      style={{
                        backgroundColor: user.status === "Active" ? "#e3372b" : "#4dbd24",
                      }}
                    >
                      {user.status === "Active" ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default AdminUsers;
