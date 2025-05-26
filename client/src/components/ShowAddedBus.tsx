import React, { useState, useEffect } from "react";
import {
    BusFront,
    MapPin,
    Calendar,
    Clock,
    Users,
    IndianRupee,
    Settings,
    CheckCircle,
    XCircle,
    AlertCircle,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Plus,
    Wind,
    Snowflake
} from "lucide-react";
import axios from "axios";
import { useCookies } from "react-cookie";

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
    createdAt: Date;
    totalBookings: number;
    revenue: number;
    occupancyRate: number;
}

const ShowAddedBus: React.FC = () => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [totalSeat,setTotalseat] = useState<number>(0);
    const [totalAmount,setTotalAmount] = useState<number>(0);
    const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [typeFilter, setTypeFilter] = useState<string>("All");
    const [isLoading, setIsLoading] = useState(true);

    // Mock data - replace with actual API call
    const host = import.meta.env.VITE_API_BASE_URL;
    const [authCookie, setAuthCookie, removeAuthCookie] = useCookies(["authtoken"])
    const token = authCookie.authtoken

    const getBuses = async () => {
        try {
            const response = await axios.get(`${host}/api/user/showAddedBus`, {
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": token
                }
            })
            if (response.data.success) {
                setIsLoading(false)
                setBuses(response.data.user.addedBus);
            }
            console.log(response.data.user)

        } catch (error) {
            console.log(error)
            alert("Failed to fetch buses. Please try again later.");
        }
    }


    const getTotalSeats = async()=>{
        try {
            const response = await axios.get(`${host}/api/user/showAddedBus`, {
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": token
                }
            })
            if (response.data.success) {
                // console.log(response.data.user.addedBus[1].bookedSeats)
                const buses = response.data.user.addedBus
                let co = 0;
                let aco = 0;
                buses.forEach((e : any) => {
                    co += e.bookedSeats.length
                    if (e.noOfSleeper == 0){
                        aco = aco + e.SeaterPrice * e.bookedSeats.length
                    }
                    else{
                        e.bookedSeats.forEach((ele: any) => {
                            if (ele.seat > e.noOfSeater){
                                aco = aco + e.SleeperPrice
                            }
                            else{
                                aco = aco + e.SeaterPrice
                            }
                        });
                    }
                });
                setTotalseat(co)
                setTotalAmount(aco)
            }

        } catch (error) {
            console.log(error)
            alert("Failed to fetch buses. Please try again later.");
        }
    }

    const getTotalAmount = async() =>{
        try {
            const response = await axios.get(`${host}/api/user/showAddedBus`, {
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": token
                }
            })
        } catch (error) {
            
        }
    }


    useEffect(() => {
        getBuses();
        getTotalSeats();
    }, []);

    // Filter buses based on search, status, and type
    //   useEffect(() => {
    //     let filtered = buses;

    //     if (searchTerm) {
    //       filtered = filtered.filter(bus => 
    //         bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         bus.busNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         bus.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         bus.destination.toLowerCase().includes(searchTerm.toLowerCase())
    //       );
    //     }

    //     if (statusFilter !== "All") {
    //       filtered = filtered.filter(bus => bus.status === statusFilter);
    //     }

    //     if (typeFilter !== "All") {
    //       filtered = filtered.filter(bus => bus.Ac_NonACtype === typeFilter);
    //     }

    //     setFilteredBuses(filtered);
    //   }, [searchTerm, statusFilter, typeFilter, buses]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Active":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "Inactive":
                return <XCircle className="w-5 h-5 text-red-500" />;
            case "Maintenance":
                return <AlertCircle className="w-5 h-5 text-yellow-500" />;
            default:
                return <AlertCircle className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800 border-green-200";
            case "Inactive":
                return "bg-red-100 text-red-800 border-red-200";
            case "Maintenance":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getOccupancyColor = (rate: number) => {
        if (rate >= 80) return "text-green-600 bg-green-100";
        if (rate >= 60) return "text-yellow-600 bg-yellow-100";
        return "text-red-600 bg-red-100";
    };

    const handleEdit = (busId: string) => {
        console.log("Edit bus:", busId);
        // Add edit functionality
    };

    const handleDelete = (busId: string) => {
        console.log("Delete bus:", busId);
        // Add delete functionality
    };

    const handleView = (busId: string) => {
        console.log("View bus details:", busId);
        // Add view functionality
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="text-gray-600 text-lg">Loading your buses...</p>
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
                            <BusFront className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            My Added Buses
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">Manage and monitor your bus fleet</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <BusFront className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Buses</p>
                                <p className="text-2xl font-bold text-gray-800">{buses.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Active Buses</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {buses.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Bookings</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {totalSeat}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <IndianRupee className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    ₹{totalAmount}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by bus name, number, or route..."
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
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Maintenance">Maintenance</option>
                            </select>
                        </div>

                        {/* Type Filter */}
                        <div className="relative">
                            <Settings className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white min-w-[140px]"
                            >
                                <option value="All">All Types</option>
                                <option value="Ac">AC</option>
                                <option value="NON_AC">Non-AC</option>
                            </select>
                        </div>

                        {/* Add Bus Button */}
                        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-medium">
                            <Plus className="w-5 h-5" />
                            Add New Bus
                        </button>
                    </div>
                </div>

                {/* Buses Grid */}
                {buses.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                        <BusFront className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Buses Found</h3>
                        {/* <p className="text-gray-500">
                            {searchTerm || statusFilter !== "All" || typeFilter !== "All"
                                ? "Try adjusting your search or filter criteria"
                                : "You haven't added any buses yet"
                            }
                        </p> */}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {buses.map((bus) => (
                            <div
                                key={bus._id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
                                                <BusFront className="w-6 h-6" />
                                                {bus.name}
                                            </h3>
                                            <p className="text-indigo-100 text-sm">{bus.busNo}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                {bus.Ac_NonACtype === "Ac" ? (
                                                    <div className="flex items-center gap-1 text-indigo-100">
                                                        <Snowflake className="w-4 h-4" />
                                                        <span className="text-sm">AC</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-indigo-100">
                                                        <Wind className="w-4 h-4" />
                                                        <span className="text-sm">Non-AC</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-2 ${getStatusColor("Active")} bg-white bg-opacity-20 backdrop-blur-sm`}>
                                            {getStatusIcon("Active")}
                                            {"Active"}
                                        </div>
                                    </div>

                                    {/* Route */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span className="font-medium">{bus.source}</span>
                                        </div>
                                        <div className="flex-1 mx-4 border-t border-indigo-300"></div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{bus.destination}</span>
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-6 space-y-4">
                                    {/* Seat Configuration */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Users className="w-4 h-4" />
                                                <span className="text-sm font-medium">Seat Configuration</span>
                                            </div>
                                            <div className="space-y-1">
                                                {bus.noOfSleeper > 0 && (
                                                    <div className="text-sm text-gray-800">
                                                        <span className="font-medium">{bus.noOfSleeper}</span> Sleeper seats
                                                    </div>
                                                )}
                                                {bus.noOfSeater > 0 && (
                                                    <div className="text-sm text-gray-800">
                                                        <span className="font-medium">{bus.noOfSeater}</span> Seater seats
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <IndianRupee className="w-4 h-4" />
                                                <span className="text-sm font-medium">Pricing</span>
                                            </div>
                                            <div className="space-y-1">
                                                {bus.SleeperPrice > 0 && (
                                                    <div className="text-sm text-gray-800">
                                                        Sleeper: <span className="font-medium">₹{bus.SleeperPrice}</span>
                                                    </div>
                                                )}
                                                {bus.SeaterPrice > 0 && (
                                                    <div className="text-sm text-gray-800">
                                                        Seater: <span className="font-medium">₹{bus.SeaterPrice}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Performance Metrics */}
                                    {/* <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-indigo-600">{bus.totalBookings}</div>
                                            <div className="text-xs text-gray-500">Total Bookings</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-green-600">₹{bus.revenue.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500">Revenue</div>
                                        </div>
                                        <div className="text-center">
                                            <div className={`text-lg font-bold px-2 py-1 rounded-lg ${getOccupancyColor(bus.occupancyRate)}`}>
                                                {bus.occupancyRate}%
                                            </div>
                                            <div className="text-xs text-gray-500">Occupancy</div>
                                        </div>
                                    </div> */}

                                    {/* Schedule and Actions */}
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <div className="text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                Added: {new Date(bus.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        {/* <div className="flex gap-2">
                                            <button
                                                onClick={() => handleView(bus.id)}
                                                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(bus.id)}
                                                className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors duration-200"
                                                title="Edit Bus"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(bus.id)}
                                                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200"
                                                title="Delete Bus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div> */}
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

export default ShowAddedBus;