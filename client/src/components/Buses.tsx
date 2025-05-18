import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';

const demoBuses = [
  {
    id: 1,
    name: 'Express Line 101',
    departure: '08:00 AM',
    arrival: '12:00 PM',
    from: 'Bhubaneswar',
    to: 'Cuttack',
    price: '₹200',
    seats: Array(40).fill(false).map((_, i) => i % 5 === 0),
  },
  {
    id: 2,
    name: 'City Rider 202',
    departure: '10:30 AM',
    arrival: '02:30 PM',
    from: 'Bhubaneswar',
    to: 'Puri',
    price: '₹250',
    seats: Array(40).fill(false).map((_, i) => i % 7 === 0),
  },
];

const Seat = ({ booked }: { booked: boolean }) => (
  <div
    className={`w-6 h-6 m-1 rounded border-2 ${
      booked ? 'bg-gray-400 border-gray-500' : 'bg-white border-gray-300'
    }`}
  ></div>
);

const Buses: React.FC = () => {
  const [openBus, setOpenBus] = useState<null | typeof demoBuses[0]>(null);

  return (
    <div className="min-h-screen text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Search Buses</h1>

        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <div className="flex items-center bg-white px-4 py-3 rounded shadow-md border border-gray-300">
            <FaMapMarkerAlt className="mr-2 text-purple-500" />
            <input
              type="text"
              placeholder="Source"
              className="bg-transparent focus:outline-none w-full placeholder-gray-500"
            />
          </div>
          <div className="flex items-center bg-white px-4 py-3 rounded shadow-md border border-gray-300">
            <FaMapMarkerAlt className="mr-2 text-pink-500" />
            <input
              type="text"
              placeholder="Destination"
              className="bg-transparent focus:outline-none w-full placeholder-gray-500"
            />
          </div>
          <div className="flex items-center bg-white px-4 py-3 rounded shadow-md border border-gray-300">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            <input
              type="date"
              className="bg-transparent focus:outline-none w-full text-gray-700"
            />
          </div>
          <button className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-3 rounded shadow-md hover:opacity-90 transition">
            Search
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <aside className="col-span-1">
            <div className="bg-white p-4 rounded shadow-md border border-gray-300">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div>
                <label className="block mb-2">
                  <input type="checkbox" className="mr-2" /> Morning (6 AM - 12 PM)
                </label>
                <label className="block mb-2">
                  <input type="checkbox" className="mr-2" /> Afternoon (12 PM - 6 PM)
                </label>
              </div>
            </div>
          </aside>

          <main className="col-span-3 space-y-4">
            {demoBuses.map((bus) => (
              <motion.div
                key={bus.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded shadow border border-gray-200 cursor-pointer hover:border-purple-400"
                onClick={() => setOpenBus(bus)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{bus.name}</h3>
                    <p className="text-sm text-gray-600">{bus.from} → {bus.to}</p>
                    <p className="text-sm text-gray-600">{bus.departure} - {bus.arrival}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-purple-600">{bus.price}</p>
                    <p className="text-sm text-gray-500">View Seats</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </main>
        </div>

        <Dialog open={!!openBus} onClose={() => setOpenBus(null)} className="relative z-50">
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
            <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl">
              <Dialog.Title className="text-2xl font-bold mb-4 text-gray-800">Select Seats - {openBus?.name}</Dialog.Title>
              <div className="grid grid-cols-4 gap-2">
                {openBus?.seats.map((booked, idx) => (
                  <Seat key={idx} booked={booked} />
                ))}
              </div>
              <div className="text-right mt-6">
                <button
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded shadow hover:opacity-90"
                  onClick={() => setOpenBus(null)}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Buses;