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
const payment_1 = __importDefault(require("../models/payment"));
const bus_1 = __importDefault(require("../models/bus"));
const user_1 = __importDefault(require("../models/user"));
const cashfree_pg_1 = require("cashfree-pg");
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const cashfree = new cashfree_pg_1.Cashfree(cashfree_pg_1.CFEnvironment.SANDBOX, CASHFREE_APP_ID, CASHFREE_SECRET_KEY);
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { orderId } = req.body;
    if (!orderId) {
        return res.status(400).json({ success: false, message: "Order ID missing" });
    }
    try {
        const payment = yield payment_1.default.findOne({ transactionId: orderId });
        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }
        // Already verified
        if (payment.paymentStatus === "completed") {
            return res.status(200).json({ success: true, message: "Payment already verified" });
        }
        const userId = payment.user;
        const busId = payment.bus;
        const seats = payment.seatsBooked;
        const bus = yield bus_1.default.findById(busId);
        const user = yield user_1.default.findById(userId);
        if (!bus || !user) {
            return res.status(404).json({ success: false, message: "User or Bus not found" });
        }
        // Check if these seats have already been booked for this payment
        const alreadyBookedInBus = bus.bookedSeats.some(s => { var _a; return ((_a = s.paymentDetails) === null || _a === void 0 ? void 0 : _a.toString()) === payment._id.toString(); });
        const alreadyBookedInUser = user.bookedBus.some(s => { var _a; return ((_a = s.paymentDetails) === null || _a === void 0 ? void 0 : _a.toString()) === payment._id.toString(); });
        if (!alreadyBookedInBus) {
            for (const seat of seats) {
                bus.bookedSeats.push({ seat, userId, paymentDetails: payment._id });
            }
            yield bus.save();
        }
        if (!alreadyBookedInUser) {
            for (const seat of seats) {
                user.bookedBus.push({ busId, seat, paymentDetails: payment._id });
            }
            yield user.save();
        }
        const response = yield cashfree.PGOrderFetchPayments(orderId);
        const paymentInfo = (_a = response.data) === null || _a === void 0 ? void 0 : _a[0];
        if (!paymentInfo) {
            return res.status(404).json({ success: false, message: "Payment info not found" });
        }
        if (paymentInfo.payment_status !== "SUCCESS") {
            return res.json({ success: false, message: "Payment not successful" });
        }
        // const paymentId = payment?._id
        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment record not found" });
        }
        // const userId = payment.user;
        // const busId = payment.bus;
        // const seats = payment.seatsBooked as number[];
        // if (!userId || !busId || !seats || seats.length === 0) {
        //     return res.status(400).json({ success: false, message: "Invalid payment data" });
        // }
        // const bus = await Bus.findById(busId);
        // const user = await User.findById(userId);
        // if (!bus || !user) {
        //     return res.status(404).json({ success: false, message: "User or Bus not found" });
        // }
        // // Add booked seats to bus and user
        // for (const seat of seats) {
        //     bus.bookedSeats.push({ seat, userId, paymentDetails: paymentId });
        //     user.bookedBus.push({ busId, seat, paymentDetails: paymentId });
        // }
        // await bus.save()
        // await user.save()
        // await Promise.all([bus.save(), user.save()]);
        const paymethod = paymentInfo.payment_group;
        payment.paymentMethod = paymethod;
        payment.paymentStatus = "completed";
        yield payment.save();
        return res.json({ success: true, message: "Payment successful" });
    }
    catch (error) {
        console.error("Cashfree API error:", ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message || error);
        return res.status(500).json({ success: false, message: "Error verifying payment" });
    }
});
exports.default = { verifyPayment };
