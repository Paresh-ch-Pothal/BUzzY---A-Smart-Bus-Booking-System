import React from 'react';
import { Bus, ShieldCheck, Wallet, Clock } from 'lucide-react';

const HomeSec2: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-gray-100 py-20 px-4 flex flex-col items-center">
      {/* Main Feature Box */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between text-white mb-20">
        {/* Left Icon */}
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <img
            src="https://pngimg.com/d/bus_PNG101206.png"
            alt="Main Bus"
            className="w-48 h-32 object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Center Text */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <h2 className="text-4xl font-bold drop-shadow-lg">Everything You Need to Travel</h2>
          <p className="text-lg">
            Explore our fast, secure, and user-friendly platform for booking your next bus ride. Safe journeys start here.
          </p>
        </div>

        {/* Right Icon */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.railyatri.in/ry_images_prod/OSRTC-1604321734.png"
            className="w-48 h-32 object-contain rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
        {/* Feature 1 */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
          <ShieldCheck className="mx-auto text-green-500" size={40} />
          <h3 className="mt-4 font-semibold text-lg">Secure Payments</h3>
          <p className="text-sm text-gray-600">We ensure your transactions are safe and encrypted.</p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
          <Bus className="mx-auto text-blue-500" size={40} />
          <h3 className="mt-4 font-semibold text-lg">Comfortable Buses</h3>
          <p className="text-sm text-gray-600">Choose from top-rated buses for a comfortable journey.</p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
          <Clock className="mx-auto text-orange-500" size={40} />
          <h3 className="mt-4 font-semibold text-lg">On-Time Departures</h3>
          <p className="text-sm text-gray-600">Punctuality is our top priority for every trip.</p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
          <Wallet className="mx-auto text-yellow-500" size={40} />
          <h3 className="mt-4 font-semibold text-lg">Affordable Fares</h3>
          <p className="text-sm text-gray-600">Travel smart with budget-friendly ticket prices.</p>
        </div>
      </div>
    </section>
  );
};

export default HomeSec2;
