'use client';
import React, { useState } from 'react';
import AdminNav from '../components/AdminNav';

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, user: 'John Doe', plan: 'Monthly Premium', status: 'Active', expiry: '2025-06-15' },
    { id: 2, user: 'Jane Smith', plan: 'Yearly Premium', status: 'Expired', expiry: '2024-12-01' },
    { id: 3, user: 'Alan Walker', plan: 'Free', status: 'Active', expiry: 'Unlimited' },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [newPlan, setNewPlan] = useState('');

  const plans = [
    {
      id: 1,
      name: 'Free',
      price: '$0',
      features: ['Basic Towing', 'Limited Support'],
    },
    {
      id: 2,
      name: 'Monthly Premium',
      price: '$10/month',
      features: ['Priority Towing', '24/7 Support', 'Faster Response'],
    },
    {
      id: 3,
      name: 'Yearly Premium',
      price: '$100/year',
      features: ['Priority Towing', '24/7 Support', 'Faster Response', 'Discounted Rates'],
    },
  ];

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewPlan(user.plan);
  };

  const handleSave = () => {
    const updated = subscriptions.map((sub) =>
      sub.id === selectedUser.id ? { ...sub, plan: newPlan } : sub
    );
    setSubscriptions(updated);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-[Segoe UI] pl-[250px]">
      <AdminNav />
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl text-gray-800 mb-6">Subscription Management</h2>

        {/* Active Subscribers */}
        <div className="mb-6 bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Active Subscribers</h3>
          <p className="text-2xl text-green-600 font-bold">
            {subscriptions.filter((sub) => sub.status === 'Active').length}
          </p>
        </div>

        {/* Subscriptions Table */}
        <div className="mb-8">
  <h3 className="text-xl text-gray-700 mb-4">All Subscriptions</h3>
  <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
    <table className="min-w-full text-sm text-left text-gray-800">
      <thead className="text-xs text-white bg-[#ed832d] border-b border-gray-200">
        <tr>
          <th scope="col" className="px-6 py-3">User</th>
          <th scope="col" className="px-6 py-3">Plan</th>
          <th scope="col" className="px-6 py-3">Status</th>
          <th scope="col" className="px-6 py-3">Expiry</th>
          <th scope="col" className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {subscriptions.map((sub, index) => (
          <tr key={sub.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">{sub.user}</td>
            <td className="px-6 py-4">{sub.plan}</td>
            <td className={`px-6 py-4 font-medium ${sub.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
              {sub.status}
            </td>
            <td className="px-6 py-4">{sub.expiry}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleEdit(sub)}
                className="text-blue-600 hover:underline hover:text-blue-800"
              >
                Edit Plan
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


        {/* Available Plans */}
        {/* <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Available Plans</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold text-gray-800">{plan.name}</h4>
                  <span className="text-blue-600 font-semibold">{plan.price}</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Edit Plan
                </button>
              </div>
            ))}
          </div>
        </div> */}

        {/* Manual Management */}
        <div className="bg-white shadow rounded p-6">
          <h3 className="text-xl text-gray-700 mb-4">Manual Management</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="User Name"
              className="p-2 border border-gray-300 rounded"
            />
            <select className="p-2 border border-gray-300 rounded">
              <option value="grant">Grant</option>
              <option value="revoke">Revoke</option>
            </select>
            <select className="p-2 border border-gray-300 rounded md:col-span-2">
              <option value="free">Free Plan</option>
              <option value="monthly">Monthly Premium</option>
              <option value="yearly">Yearly Premium</option>
            </select>
            <button
              type="submit"
              className="p-2 bg-green-600 text-white rounded hover:bg-green-700 md:col-span-4"
            >
              Apply
            </button>
          </form>
        </div>

        {/* Edit Plan Modal */}
        {selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-xl w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">
                Edit Plan for <span className="text-blue-600">{selectedUser.user}</span>
              </h3>
              <select
                value={newPlan}
                onChange={(e) => setNewPlan(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              >
                <option value="Free">Free</option>
                <option value="Monthly Premium">Monthly Premium</option>
                <option value="Yearly Premium">Yearly Premium</option>
              </select>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
