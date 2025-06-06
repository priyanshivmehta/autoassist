import React from 'react';
import { BiPhone, BiMailSend } from "react-icons/bi";

const Footer = () => (
  <footer className="w-full bg-black text-white py-10 px-4 sm:px-6 lg:px-8 mt-10 ml-10">
    <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-4">
      
      {/* Company Info */}
      <div className="space-y-4">
        <h3 className="text-xl mb-2">Auto<span className="text-[#ed832d]">Assist</span></h3>
        <p className="text-sm text-gray-300">
          24/7 vehicle care and roadside assistance <br /> partner for bikes & cars across India
        </p>
        <p className="mt-4 text-sm text-gray-400">
          <strong>Corporate Office</strong><br />
          Dumas Road, Keval Chowk,<br />
          Ichchhanath, Surat, Gujarat 395007, India
        </p>
      </div>

      {/* Reach Us */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">Reach Us</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <BiPhone /><a href="tel:1234567890" className="hover:underline">1234567890</a>
          </div>
          <div className="flex items-center gap-2">
            <BiPhone /><a href="tel:7022012201" className="hover:underline">70 2201 2201</a>
          </div>
          <div className="flex items-center gap-2">
            <BiMailSend /><a href="mailto:help@autoassist.in" className="hover:underline">help@autoassist.in</a>
          </div>
        </div>
      </div>

      {/* Company Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">Company</h3>
        <ul className="space-y-1 text-sm text-gray-300">
          <li><a href="#" className="hover:underline">Contact Us</a></li>
          <li><a href="#" className="hover:underline">About Us</a></li>
          <li><a href="#" className="hover:underline">Career</a></li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="space-y-4">
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
);

export default Footer;
