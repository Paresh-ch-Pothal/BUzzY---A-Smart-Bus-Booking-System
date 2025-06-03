"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bus_1 = __importDefault(require("../models/bus"));
const user_1 = __importDefault(require("../models/user"));
const uuid_1 = require("uuid");
const payment_1 = __importDefault(require("../models/payment"));
const cashfree_pg_1 = require("cashfree-pg");
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const HOST = process.env.FRONTEND_HOST;
const addBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, busNo, Ac_NonACtype, source, destination, noOfSleeper, noOfSeater, SleeperPrice, SeaterPrice, arrivalTime, departureTime, departureDate, arrivalDate } = req.body;
        if (!name || !busNo || !source || !destination || !arrivalTime || !departureTime) {
            return res.status(400).json({ message: "Please fill all the fields", success: false });
        }
        console.log(req.user);
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to add a bus", success: false });
        }
        const bus = yield bus_1.default.create({
            name, busNo, Ac_NonACtype, source,
            destination, noOfSleeper, noOfSeater, SleeperPrice,
            SeaterPrice, arrivalTime, departureTime,
            departureDate, arrivalDate,
            addedBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        const adminUser = yield user_1.default.findById(req.user._id);
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin user not found', success: false });
        }
        adminUser.addedBus.push(bus._id);
        yield adminUser.save();
        return res.status(201).json({ message: "Bus added successfully", success: true, bus });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
});
// booking a bus by the user
// const bookABus = async(req : AuthenticatedRequest , res : Response) =>{
//     try {
//         const userId=req.user._id;
//         if(!userId){
//             return res.status(400).json({ message: "Please login to book a bus", success: false })
//         }
//         const {seat} = req.body;
//         if(!seat){
//             return res.status(400).json({ message: "Please select a seat", success: false })    
//         }
//         const busId = req.params.id
//         const bus = await Bus.findById(busId);
//         if(!bus){
//             return res.status(404).json({ message: "Bus not found", success: false })
//         }
//         // here i am checking if the seat is already booked or not
//         const bookedSeat = bus.bookedSeats.map((b) => b.seat == seat);
//         if(bookedSeat.includes(true)){
//             return res.status(400).json({ message: "Seat already booked", success: false })
//         }
//         bus.bookedSeats.push({seat,userId: userId});
//         await bus?.save()
//         const user = await User.findById(userId);
//         user?.bookedBus.push({busId: busId,seat : seat});
//         await user?.save()
//         return res.status(200).json({ message: "Bus booked successfully", success: true, bus })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Internal server error", success: false })
//     }
// }
const bookABus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, seat } = req.body;
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ message: "Please login to book a bus", success: false });
        }
        if (!seat || !Array.isArray(seat) || seat.length === 0) {
            return res.status(400).json({ message: "Please select at least one seat", success: false });
        }
        const busId = req.params.id;
        const bus = yield bus_1.default.findById(busId);
        if (!bus) {
            return res.status(404).json({ message: "Bus not found", success: false });
        }
        // Check for already booked seats
        const bookedSeatNumbers = bus.bookedSeats.map(b => b.seat);
        const alreadyBooked = seat.filter(s => bookedSeatNumbers.includes(s));
        if (alreadyBooked.length > 0) {
            return res.status(400).json({
                message: `Seats already booked: ${alreadyBooked.join(", ")}`,
                success: false
            });
        }
        const transactionId = (0, uuid_1.v4)();
        const user = yield user_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const cashfree = new cashfree_pg_1.Cashfree(cashfree_pg_1.CFEnvironment.SANDBOX, CASHFREE_APP_ID, CASHFREE_SECRET_KEY);
        const orderRequest = {
            order_id: transactionId,
            order_amount: amount,
            order_currency: "INR",
            customer_details: {
                customer_id: userId.toString(),
                customer_name: user.name,
                customer_email: user.email || "test@example.com", // Use real email if available
                customer_phone: "9999999999" // Use real phone if available
            },
            order_meta: {
                return_url: `${HOST}/payment/callback?order_id=${transactionId}`,
                payment_methods: "cc,dc,upi"
            },
            order_tags: {
                name: "Developer",
                company: "Cashfree"
            }
        };
        const response = yield cashfree.PGCreateOrder(orderRequest);
        if (!response.data || !response.data.payment_session_id) {
            return res.status(500).json({ message: "Failed to create payment order", success: false });
        }
        // Save pending payment record
        yield payment_1.default.create({
            user: userId,
            bus: busId,
            seatsBooked: seat,
            amount,
            paymentStatus: "pending",
            transactionId
        });
        // Return payment session id or URL for frontend to proceed with payment
        return res.status(200).json({
            message: "Payment initiated. Proceed with payment using session id.",
            paymentSessionId: response.data.payment_session_id,
            success: true
        });
    }
    catch (error) {
        console.error("Booking error:", error);
        return res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
});
//search functionality for the bus where the user type source , destination and departure date
// const searchBus = async (req: Request, res: Response) => {
//     try {
//         const { source, destination, startDate } = req.body;
//         if (!source || !destination || !startDate) {
//             return res.status(400).json({ message: "Please fill all the fields", success: false })
//         }
//         //normalizing the inputs
//         const querySource = String(source).trim().toLowerCase();
//         const queryDestination = String(destination).trim().toLowerCase();
//         const queryDate = new Date(String(startDate));
//         const curDate = new Date();
//         if (queryDate >= curDate) {
//             const startOfDay = new Date(queryDate);
//             queryDate.setHours(0, 0, 0, 0);
//             const endOfDay = new Date(queryDate);
//             endOfDay.setHours(23, 59, 59, 999);
//             const buses = await Bus.find({
//                 source: { $regex: new RegExp(`^${querySource}$`, 'i') }, // case-insensitive exact match
//                 destination: { $regex: new RegExp(`^${queryDestination}$`, 'i') },
//                 departureDate: {
//                     $gte: startOfDay,
//                     $lte: endOfDay
//                 }
//             })
//             if (buses.length == 0) {
//                 return res.status(404).json({ message: "No buses found", success: false })
//             }
//             return res.status(200).json({ message: "Buses found", success: true, buses })
//         }
//         else {
//             return res.status(400).json({ message: "Bus not available for the selected data", success: false })
//         }
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Internal Server Error", success: false })
//     }
// }
const searchBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { source, destination, startDate } = req.body;
        if (!source || !destination || !startDate) {
            return res.status(400).json({ message: "Please fill all the fields", success: false });
        }
        const querySource = String(source).trim().toLowerCase();
        const queryDestination = String(destination).trim().toLowerCase();
        const queryDate = new Date(startDate);
        const currentDateTime = new Date();
        const startOfDay = new Date(queryDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(queryDate);
        endOfDay.setHours(23, 59, 59, 999);
        const buses = yield bus_1.default.find({
            source: { $regex: new RegExp(`^${querySource}$`, 'i') },
            destination: { $regex: new RegExp(`^${queryDestination}$`, 'i') },
            departureDate: { $gte: startOfDay, $lte: endOfDay }
        });
        const isToday = queryDate.getFullYear() === currentDateTime.getFullYear() &&
            queryDate.getMonth() === currentDateTime.getMonth() &&
            queryDate.getDate() === currentDateTime.getDate();
        const filteredBuses = isToday
            ? buses.filter((bus) => {
                // Combine departureDate and departureTime string into a Date object
                const [hours, minutes] = bus.departureTime.split(":").map(Number);
                const departureDateTime = new Date(bus.departureDate);
                departureDateTime.setHours(hours, minutes, 0, 0);
                return departureDateTime >= currentDateTime;
            })
            : buses;
        if (filteredBuses.length === 0) {
            return res.status(404).json({ message: "No buses found", success: false });
        }
        return res.status(200).json({ message: "Buses found", success: true, buses: filteredBuses });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
});
// fetching the details of booked seats , remaning seats, no of sleeper and seater seats
const getBusDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const busId = req.params.id;
        const bus = yield bus_1.default.findById(busId);
        if (!bus) {
            return res.status(404).json({ message: "Bus not Found", success: false });
        }
        const bookedSeats = bus.bookedSeats.map((e) => e.seat);
        const noOfSleeperSeats = bus.noOfSleeper ? bus.noOfSleeper : 0;
        const noOfSeaterSeats = bus.noOfSeater ? bus.noOfSeater : 0;
        const seaterPrice = bus.SeaterPrice ? bus.SeaterPrice : 0;
        const sleeperPrice = bus.SleeperPrice ? bus.SleeperPrice : 0;
        const bookedSleeperSeats = bus.bookedSeats.filter((e) => e.seat > noOfSeaterSeats).map((e) => e.seat);
        const bookedSeaterSeats = bus.bookedSeats.filter((e) => e.seat <= noOfSeaterSeats).map((e) => e.seat);
        return res.status(200).json({
            message: "Bus Details fetched successfully",
            success: true,
            noOfSeaterSeats,
            noOfSleeperSeats,
            seaterPrice,
            sleeperPrice,
            bookedSleeperSeats, bookedSeaterSeats
        });
    }
    catch (error) {
    }
});
exports.default = { addBus, bookABus, searchBus, getBusDetails };
