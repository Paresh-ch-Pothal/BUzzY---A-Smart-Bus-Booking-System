import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaBusAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gray-700">
        
        {/* Brand/Logo */}
        <div>
          <div className="flex items-center mb-4 text-white">
            <FaBusAlt className="text-2xl mr-2 text-yellow-400" />
            <h3 className="text-2xl font-bold">BUzzY</h3>
          </div>
          <p className="text-sm text-gray-400">
            Your trusted platform to book safe and comfortable bus journeys across cities with real-time tracking and seamless payments.
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link to="/buses" className="hover:text-yellow-400 transition">Buses</Link></li>
            <li><Link to="/mybookings" className="hover:text-yellow-400 transition">My Bookings</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <FaEnvelope size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <FaGithub size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400">
              <FaFacebookF size={18} />
            </a>
          </div>
          <p className="text-sm text-gray-500">Email: xxxxxxxxx@gmail.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-700">
        &copy; {new Date().getFullYear()} BUzzY. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
