import React from 'react';
import { Link } from 'react-router-dom';

const HomeSec1: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black bg-opacity-40 w-full h-full flex flex-col justify-center px-8 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-md">
              Your Journey Starts Here
            </h1>
            <p className="text-lg md:text-xl drop-shadow-sm">
              Book comfortable and reliable buses across the country. Affordable, fast, and safe travel.
            </p>
            <Link to='/buses'>
            <button className="bg-white cursor-pointer text-blue-600 hover:bg-blue-100 font-semibold px-6 py-3 rounded-lg text-lg transition shadow-lg">
              Book Now
            </button></Link>
          </div>

          {/* Right: Bus Images */}
          <div className="flex flex-wrap gap-4 justify-center">
            <img
              src="https://s.alicdn.com/@sc04/kf/H4938d08ef72e4e82be4d595dc73a31b5a.png"
              alt="Bus 1"
              className="w-40 h-28 object-cover rounded-xl shadow-lg transform hover:scale-105 transition"
            />
            <img
              src="https://www.freeiconspng.com/thumbs/bus-png/bus-png-4.png"
              alt="Bus 2"
              className="w-40 h-28 object-cover rounded-xl shadow-lg transform hover:scale-105 transition"
            />
            <img
              src="https://pngimg.com/d/bus_PNG8615.png"
              alt="Bus 3"
              className="w-40 h-28 object-cover rounded-xl shadow-lg transform hover:scale-105 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSec1;
