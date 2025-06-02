import React, { useState, useEffect } from "react";
import {
  BusFront,
  MapPin,
  Calendar,
  Clock,
  IndianRupee,
  Ticket,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Users,
  BadgeIndianRupee,
} from "lucide-react";
import { useCookies } from "react-cookie";
import axios from "axios";


const MyBooking: React.FC = () => {
  const [bookings, setBookings] = useState([]);
  // const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);


  const [authCookie, setAuthCookie, removeAuthCookie] = useCookies(["authtoken"])

  const token = authCookie.authtoken

  const host = import.meta.env.VITE_API_BASE_URL;

  const getBookings = async () => {
    try {
      const response = await axios.get(`${host}/api/user/showBookings`, {
        headers: {
          authtoken: token,
        },
      });
      if (response.data.success) {
        setBookings(response.data.user.bookedBus);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  // Mock data - replace with actual API call
  useEffect(() => {
    getBookings()
  }, [token]);

  // Filter bookings based on search and status
  // useEffect(() => {
  //   let filtered = bookings;

  //   if (searchTerm) {
  //     filtered = filtered.filter(booking =>
  //       booking.busName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       booking.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       booking.pnr.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   if (statusFilter !== "All") {
  //     filtered = filtered.filter(booking => booking.status === statusFilter);
  //   }

  //   setFilteredBookings(filtered);
  // }, [searchTerm, statusFilter, bookings]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-600 text-lg">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Ticket className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              My Bookings
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Manage and track all your bus reservations</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by bus name, route, or PNR..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white min-w-[160px]"
              >
                <option value="All">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Grid */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Bookings Found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "All"
                ? "Try adjusting your search or filter criteria"
                : "You haven't made any bookings yet"
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <BusFront className="w-6 h-6" />
                        {booking.busId.name}
                      </h3>
                      <p className="text-indigo-100 text-sm">{booking.busId.busNo}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-2 ${getStatusColor(booking.paymentDetails.paymentStatus
                    )} bg-white bg-opacity-20 backdrop-blur-sm`}>
                      {getStatusIcon(booking.paymentDetails.paymentStatus)}
                      {booking.paymentDetails.paymentStatus}
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{booking.busId.source}</span>
                    </div>
                    <div className="flex-1 mx-4 border-t border-indigo-300"></div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{booking.busId.destination}</span>
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  {/* Journey Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Departure</span>
                      </div>
                      <div className="text-gray-800">
                        <div className="font-bold">{new Date(booking.busId.departureDate).toLocaleDateString()}</div>
                        <div className="text-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {booking.busId.departureTime}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Arrival</span>
                      </div>
                      <div className="text-gray-800">
                        <div className="font-bold">{new Date(booking.busId.arrivalDate).toLocaleDateString()}</div>
                        <div className="text-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {booking.busId.arrivalTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <BadgeIndianRupee size={34} className=" text-gray-500" />
                        <span className="text-sm text-gray-600">Transaction Id:</span>
                        <span className="font-small">{booking.paymentDetails.transactionId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Seats:</span>
                        <span className="font-medium">
                          {booking.paymentDetails.seatsBooked.map(seat => seat).join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Type:</span>
                        <span className="font-medium">{booking.busId.Ac_NonACtype}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Total:</span>
                        <span className="font-bold text-lg text-indigo-600">₹{booking.paymentDetails.amount}</span>
                      </div>
                    </div>
                  </div>

                  {/* PNR and Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    {/* <div>
                      <span className="text-xs text-gray-500">PNR Number</span>
                      <div className="font-mono font-bold text-gray-800">{booking.pnr}</div>
                    </div> */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors duration-200">
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;