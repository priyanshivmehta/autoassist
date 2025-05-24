'use client';
import { useState } from 'react';
import AdminNav from '../components/AdminNav';

export default function AdminSettingsPage() {
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Priyanshi Mehta', email: 'admin1@towapp.com' },
    { id: 2, name: 'Alex Kumar', email: 'admin2@towapp.com' },
  ]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '' });

  const [settings, setSettings] = useState({
    timeout: 30,
    bookingRadius: 5,
  });

  const [password, setPassword] = useState({ old: '', new: '', confirm: '' });

  const handleAddAdmin = () => {
    const id = admins.length + 1;
    setAdmins([...admins, { ...newAdmin, id }]);
    setNewAdmin({ name: '', email: '' });
  };

  const handleRemoveAdmin = (id) => {
    setAdmins(admins.filter((a) => a.id !== id));
  };

  const handleSaveSettings = () => {
    console.log('Saved settings:', settings);
  };

  const handlePasswordChange = () => {
    if (password.new !== password.confirm) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Change password request:', password);
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen ml-[220px]">
    <AdminNav />
      <h2 className="text-3xl mb-8 text-gray-800">Admin Settings & Access Control</h2>

      {/* Change Password */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10">
        <h3 className="text-xl mb-4 text-black">Change Admin Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="password"
            placeholder="Old Password"
            value={password.old}
            onChange={(e) => setPassword({ ...password, old: e.target.value })}
            className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#ed832d]"
          />
          <input
            type="password"
            placeholder="New Password"
            value={password.new}
            onChange={(e) => setPassword({ ...password, new: e.target.value })}
            className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#ed832d]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={password.confirm}
            onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
            className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#ed832d]"
          />
        </div>
        <button
          onClick={handlePasswordChange}
          className="mt-5 px-6 py-2 bg-black text-white rounded-xl hover:bg-[#ed832d] transition-all duration-300 ease-in-out shadow-md"
        >
          Update Password
        </button>
      </div>

      {/* Manage Admins */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10">
        <h3 className="text-xl mb-4 text-black">Manage Admin Accounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Admin Name"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Admin Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          onClick={handleAddAdmin}
          className="mb-5 px-6 py-2 bg-black text-white rounded-xl hover:bg-[#ed832d] transition-all duration-300 ease-in-out shadow-md"
        >
          Add Admin
        </button>

        <ul className="space-y-3">
          {admins.map((admin) => (
            <li key={admin.id} className="flex justify-between items-center border p-4 rounded-xl bg-gray-50 shadow-sm">
              <span className="text-gray-700">{admin.name} (<span className="text-sm text-gray-500">{admin.email}</span>)</span>
              <button
                onClick={() => handleRemoveAdmin(admin.id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* System-wide Settings */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl mb-4 text-black">System Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-600 mb-1">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.timeout}
              onChange={(e) => setSettings({ ...settings, timeout: e.target.value })}
              className="border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-600 mb-1">Booking Radius (km)</label>
            <input
              type="number"
              value={settings.bookingRadius}
              onChange={(e) => setSettings({ ...settings, bookingRadius: e.target.value })}
              className="border rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
        <button
          onClick={handleSaveSettings}
          className="mt-5 px-6 py-2 bg-black text-white rounded-xl hover:bg-[#ed832d] transition-all duration-300 ease-in-out shadow-md"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
