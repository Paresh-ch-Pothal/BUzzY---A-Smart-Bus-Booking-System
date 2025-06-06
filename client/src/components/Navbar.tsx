import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaBusAlt } from 'react-icons/fa';
import { useCookies } from "react-cookie";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => setMenuOpen(!menuOpen);

  const [cookies, , removeCookie] = useCookies(['authtoken']);
  const [userCookie, , removeUserCookie] = useCookies(['role']);
  const [, , removeNameCookie] = useCookies(['name']);
  console.log(userCookie.role)
  let token: boolean;
  if (cookies.authtoken) {
    token = true;
  }
  else {
    token = false;
  }

  const navigate = useNavigate();

  const handleLogout = (): void => {
    removeCookie("authtoken", { path: '/' });
    removeNameCookie("name", { path: '/' });
    removeUserCookie("role", { path: '/' });
    window.location.reload();
    navigate("/")
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition">
          🚌 BusBooking
        </Link> */}
        <Link to='/' className="flex items-center">
          <FaBusAlt className="text-2xl mr-2 text-red-500" />
          <h3 className="text-2xl font-bold">BUzzY</h3>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Home
          </Link>
          <Link to="/buses" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Buses
          </Link>
          <Link to="/mybookings" className="text-gray-700 hover:text-blue-600 transition font-medium">
            My Bookings
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Contact
          </Link>
          {userCookie.role === "admin" && (<Link to="/addBus" className="text-gray-700 hover:text-blue-600 transition font-medium">
            AddBus
          </Link>)}
          {userCookie.role === "admin" && (<Link to="/showAddBus" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Added Bus
          </Link>)}

        </div>

        <div className="hidden md:flex items-center space-x-4">
          {token ? (<button onClick={handleLogout}
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
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/buses" className="block text-gray-700 hover:text-blue-600 transition">Buses</Link>
          <Link to="/mybookings" className="block text-gray-700 hover:text-blue-600 transition">My Bookings</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-blue-600 transition">Contact</Link>
          {userCookie.role === "admin" && (<Link to="/addBus" className="block text-gray-700 hover:text-blue-600 transition">
            AddBus
          </Link>)}
          {userCookie.role === "admin" && (<Link to="/showAddBus" className="block text-gray-700 hover:text-blue-600 transition">
            Added Bus
          </Link>)}
          {token ? (<button onClick={handleLogout}
            className="w-full text-left text-red-500 hover:text-red-700 mt-2"
          >
            Logout
          </button>) : (<button
            className="w-full text-left text-blue-500 hover:text-blue-700 mt-2"
          >
            Login
          </button>)}


        </div>
      )}
    </nav>
  );
};

export default Navbar;
