import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaBusAlt } from 'react-icons/fa';
import { useCookies } from "react-cookie";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Simulated auth state

  const toggleMenu = (): void => setMenuOpen(!menuOpen);

  const [cookies, setCookie, removeCookie] = useCookies(['authtoken'])
  let token: boolean;
  if (cookies.authtoken) {
    token = true;
  }
  else {
    token = false;
  }

  const handleLogout = () : void => {
    removeCookie("authtoken", {path: '/'});
    window.location.reload();
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition">
          🚌 BusBooking
        </Link> */}
        <Link to='/' className="flex items-center">
          <FaBusAlt className="text-2xl mr-2 text-red-500" />
          <h3 className="text-2xl font-bold">GoBus</h3>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Home
          </Link>
          <Link to="/buses" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Buses
          </Link>
          <Link to="/bookings" className="text-gray-700 hover:text-blue-600 transition font-medium">
            My Bookings
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {token ? (<button  onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>) : (<Link to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Login
          </Link>)}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {/* {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/buses" className="block text-gray-700 hover:text-blue-600 transition">Buses</Link>
          <Link to="/bookings" className="block text-gray-700 hover:text-blue-600 transition">My Bookings</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-blue-600 transition">Contact</Link>
          {isLoggedIn ? (
            <button
              className="w-full text-left text-red-500 hover:text-red-700 mt-2"
            >
              Logout
            </button>
          ) : (
            <button
              className="w-full text-left text-blue-500 hover:text-blue-700 mt-2"
            >
              Login
            </button>
          )}
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
