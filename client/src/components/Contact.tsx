import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 transition hover:shadow-3xl border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Send us a Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              ></textarea>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Contact Info + Map */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
              <h4 className="text-xl font-semibold mb-4 text-gray-700">Get in Touch</h4>
              <p className="flex items-center mb-3 text-gray-600">
                <FaPhoneAlt className="mr-2 text-green-500" /> +91 98XXX XXXXX
              </p>
              <p className="flex items-center mb-3 text-gray-600">
                <FaEnvelope className="mr-2 text-blue-500" /> supportxxxxxxx@gmail.com
              </p>
              <p className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-red-500" /> Address,India
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <iframe
                title="Google Map"
                className="w-full h-64"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.314524706863!2d85.81350437486956!3d20.35352030947988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909c3dcdbf6d1%3A0x75c0014e95b92ed9!2sIIIT%20Bhubaneswar!5e0!3m2!1sen!2sin!4v1716030701600!5m2!1sen!2sin"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
