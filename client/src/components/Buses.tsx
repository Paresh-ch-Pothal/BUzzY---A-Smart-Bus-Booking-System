import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Clock, Users, Bed, Filter, Search, X, Armchair } from 'lucide-react';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { PiSteeringWheelFill } from "react-icons/pi";
import { useCookies } from 'react-cookie';
import { load } from "@cashfreepayments/cashfree-js";


interface Bus {
  _id: string;
  name: string;
  busNo: string;
  Ac_NonACtype: "Ac" | "NON_AC";
  source: string;
  destination: string;
  noOfSleeper: number;
  noOfSeater: number;
  SleeperPrice: number;
  SeaterPrice: number;
  arrivalTime: string;
  departureTime: string;
  arrivalDate: string;
  departureDate: string;
  createdAt: Date;
  totalBookings: number;
  revenue: number;
  occupancyRate: number;
}



interface SeatProps {
  booked: any;
  selected: any;
  onClick: any;
  index: any;
  seatType: any;
}

const Seat: React.FC<SeatProps> = ({ booked, selected, onClick, seatType }) => {
  const isSeater = seatType === "seater";

  return (
    <div
      className={`w-10 h-8 m-1 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-semibold hover:scale-110 ${booked
        ? "bg-red-100 border-red-300 text-red-600 cursor-not-allowed"
        : selected
          ? "bg-green-500 border-green-600 text-white shadow-lg"
          : "bg-white border-gray-300 text-gray-600 hover:border-purple-400 hover:bg-purple-50"
        }`}
      onClick={!booked ? onClick : undefined}
    >
      {isSeater ? <Armchair size={14} /> : <Bed size={14} />}
    </div>
  );
};

const Buses = () => {
  const [openBus, setOpenBus] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<any>([]);
  const [showFilters, setShowFilters] = useState(false);

  const [searching, setSearching] = useState<Boolean>(false)

  // const handleSeatClick = (seatIndex) => {
  //   setSelectedSeats(prev => 
  //     prev.includes(seatIndex) 
  //       ? prev.filter(s => s !== seatIndex)
  //       : [...prev, seatIndex]
  //   );
  // };




  // for search Fuctionality
  const [buses, setBuses] = useState<Bus[]>([]);

  const host = import.meta.env.VITE_API_BASE_URL;

  const [searchBus, setSearchBus] = React.useState({
    source: '',
    destination: '',
    startDate: ''
  })

  const getSearchBus = async () => {
    try {
      setSearching(true)
      const response = await axios.post(`${host}/api/bus/searchBus`, {
        source: searchBus.source,
        destination: searchBus.destination,
        startDate: searchBus.startDate
      });
      if (response.data.success) {
        setSearching(false)
        setBuses(response.data.buses);
      }
    } catch (error: any) {
      setSearching(false)
      console.log(error);
      const errorMessage = error.response?.data?.message
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }


  // for getting booked seats and unbooked seats functionality
  // const [Loading, setLoading] = useState<boolean>(false);

  interface BusDetails {
    sleeperSeats: number;
    seaterSeats: number;
    bookedSleeperSeats: number[];
    bookedSeaterSeats: number[];
    sleeperPrice: number;
    seaterPrice: number;
  }

  const [getbusdetails, setgetBusDetails] = useState<BusDetails>({
    sleeperSeats: 0,
    seaterSeats: 0,
    bookedSleeperSeats: [],
    bookedSeaterSeats: [],
    sleeperPrice: 0,
    seaterPrice: 0
  })


  const [busId, setBusId] = useState<string>("")
  const getBusDetails = async (busId: string) => {
    try {
      const response = await axios.post(`${host}/api/bus/getStatusForBooked/${busId}`, {
        headers: {
          "Content-type": "application/json"
        }
      })
      console.log(response)
      if (response.data.success) {
        setgetBusDetails({
          sleeperSeats: response.data.noOfSleeperSeats,
          seaterSeats: response.data.noOfSeaterSeats,
          bookedSleeperSeats: response.data.bookedSleeperSeats,
          bookedSeaterSeats: response.data.bookedSeaterSeats,
          sleeperPrice: response.data.sleeperPrice,
          seaterPrice: response.data.seaterPrice
        })
        setBusId(busId)
        setOpenBus(true)
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response?.data?.message
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }




  const handleSeatClick = (index: any) => {
    if (selectedSeats.includes(index)) {
      setSelectedSeats(selectedSeats.filter((i: any) => i !== index));
    } else {
      setSelectedSeats([...selectedSeats, index]);
    }
  };

  console.log(selectedSeats)

  const [amount, setAmount] = useState<number>(0);


  useEffect(() => {
    const total = selectedSeats.reduce((total: number, seatIndex: number) => {
      return total + (seatIndex < getbusdetails.seaterSeats
        ? getbusdetails.seaterPrice
        : getbusdetails.sleeperPrice);
    }, 0);
    setAmount(total);
  }, [selectedSeats, getbusdetails]);


  // make a function for booking a seat

  let cashfree: any;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox"
    });
  }
  initializeSDK();

  const doPayment = async (sessionId: string) => {
    let checkoutOptions = {
      paymentSessionId: sessionId,
      redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions);
  };

  const [authCookie, ,] = useCookies(["authtoken"])

  const token = authCookie.authtoken

  const handleBookSeat = async (seats: number[], amount: number, busId: string) => {
    if (!token) {
      toast.error("Please Login", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    else {
      try {
        const response = await axios.post(`${host}/api/bus/bookBus/${busId}`, {
          seat: seats,
          amount: amount
        }, {
          headers: {
            "authtoken": token
          }
        })
        if (response.data.success) {
          doPayment(response.data.paymentSessionId);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Bus
          </h1>
          <p className="text-gray-600 text-lg">Comfortable journeys, affordable prices</p>
        </div>

        {/* Search Form */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 z-10" size={20} />
              <input
                type="text"
                id='source'
                name='source'
                value={searchBus.source}
                onChange={(e) => setSearchBus(prev => ({ ...prev, source: e.target.value }))}
                placeholder="From"
                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 placeholder-gray-500"
              />
            </div>
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 z-10" size={20} />
              <input
                type="text"
                id='destination'
                name='destination'
                value={searchBus.destination}
                onChange={(e) => setSearchBus(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="To"
                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-200 placeholder-gray-500"
              />
            </div>
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 z-10" size={20} />
              <input
                type="date"
                id='startDate'
                name='startDate'
                value={searchBus.startDate}
                onChange={(e) => setSearchBus(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button onClick={getSearchBus} className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
              <Search size={20} />
              {searching ? (<div className="flex items-center justify-center space-x-2 text-sm text-white font-medium animate-pulse">
                <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Searching for buses...</span>
              </div>) : (<span>Search Buses</span>)}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h2>
                <button
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? <X size={20} /> : <Filter size={20} />}
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Departure Time</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Morning (6 AM - 12 PM)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Afternoon (12 PM - 6 PM)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Evening (6 PM - 12 AM)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Bus Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">AC Seater</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">AC Sleeper</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Volvo</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bus Results */}
          <div className="lg:w-3/4 space-y-6">
            {buses.length == 0 &&
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-4">No Buses Found</h2>
                <p className="text-gray-600">Try changing your search criteria.</p>
              </div>}
            {buses.map((bus) => (
              <div
                key={bus._id}
                className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer group"

              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                        {bus.name}
                      </h3>
                      <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {bus.Ac_NonACtype}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin size={14} />
                      <span className="text-sm">{bus.source} → {bus.destination}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <div className="flex flex-col">
                          <span>
                            Departure: {new Date(bus.departureDate).toISOString().split('T')[0]} | {bus.departureTime}
                          </span>
                          <span>
                            Arrival: {new Date(bus.arrivalDate).toISOString().split('T')[0]} | {bus.arrivalTime}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="text-center lg:text-right">
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                      {bus.SeaterPrice == 0 ? bus.SleeperPrice : bus.SleeperPrice == 0 ?
                        bus.SeaterPrice : bus.SeaterPrice || bus.SleeperPrice}
                    </p>
                    <button onClick={() => { getBusDetails(bus._id) }} className="cursor-pointer bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto lg:mx-0">
                      <Users size={16} />
                      View Seats
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seat Selection Modal */}
        {openBus && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

              <div className="p-6">
                <div className="mb-6 space-y-4">
                  {/* Seater Legend */}
                  <div>
                    <h2 className="text-sm font-semibold mb-2 text-center">Seater Legend</h2>
                    <div className="flex items-center justify-center gap-8 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded flex items-center justify-center">
                          <Armchair size={10} />
                        </div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 border-2 border-green-600 rounded flex items-center justify-center text-white">
                          <Armchair size={10} />
                        </div>
                        <span>Selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-red-100 border-2 border-red-300 rounded flex items-center justify-center text-red-600">
                          <Armchair size={10} />
                        </div>
                        <span>Booked</span>
                      </div>
                    </div>
                  </div>

                  {/* Sleeper Legend */}
                  <div>
                    <h2 className="text-sm font-semibold mb-2 text-center">Sleeper Legend</h2>
                    <div className="flex items-center justify-center gap-8 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded flex items-center justify-center">
                          <Bed size={10} />
                        </div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 border-2 border-green-600 rounded flex items-center justify-center text-white">
                          <Bed size={10} />
                        </div>
                        <span>Selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-red-100 border-2 border-red-300 rounded flex items-center justify-center text-red-600">
                          <Bed size={10} />
                        </div>
                        <span>Booked</span>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="text-center mb-4">
                    <div className="bg-gray-800 text-white px-4 py-2 rounded-lg inline-block">
                      <PiSteeringWheelFill />
                    </div>
                  </div>

                  <div className="max-w-lg mx-auto">
                    {/* Seater Seats Section */}
                    <div>
                      <h2 className="text-sm font-semibold mb-1">Seater</h2>
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {Array.from({ length: getbusdetails.seaterSeats }).map((_, idx) => {
                          const seatIndex = idx + 1;
                          return (
                            <Seat
                              key={seatIndex}
                              booked={getbusdetails.bookedSeaterSeats.includes(seatIndex)}
                              selected={selectedSeats.includes(seatIndex)}
                              onClick={() => handleSeatClick(seatIndex)}
                              index={seatIndex}
                              seatType="seater"
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Sleeper Seats Section */}
                    <div>
                      <h2 className="text-sm font-semibold mb-1">Sleeper</h2>
                      <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: getbusdetails.sleeperSeats }).map((_, idx) => {
                          const seatIndex = getbusdetails.seaterSeats + idx + 1;
                          return (
                            <Seat
                              key={seatIndex}
                              booked={getbusdetails.bookedSleeperSeats.includes(seatIndex)}
                              selected={selectedSeats.includes(seatIndex)}
                              onClick={() => handleSeatClick(seatIndex)}
                              index={seatIndex}
                              seatType="sleeper"
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedSeats.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">Selected Seats:</span>
                      <span className="text-purple-600 font-bold">
                        {selectedSeats.map((s: any) => s).join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">Total Amount:</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{amount}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => {
                      setOpenBus(false);
                      setSelectedSeats([]);
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => { handleBookSeat(selectedSeats, amount, busId) }}
                    disabled={selectedSeats.length === 0}
                    className="cursor-pointer px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Book Now ₹ {amount}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buses;