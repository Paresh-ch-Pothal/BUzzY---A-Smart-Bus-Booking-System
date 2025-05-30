import { Request, Response } from "express";
import Payment from "../models/payment";
import Bus from "../models/bus";
import User from "../models/user";
import { Cashfree, CFEnvironment } from "cashfree-pg";

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID!;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY!;

const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,
    CASHFREE_APP_ID,
    CASHFREE_SECRET_KEY
);

const verifyPayment = async (req: Request, res: Response): Promise<Response> => {
    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ success: false, message: "Order ID missing" });
    }

    try {
        const response = await cashfree.PGOrderFetchPayments(orderId);

        // Assuming response.data is an array and first element contains payment info
        const paymentInfo = response.data?.[0];
        if (!paymentInfo) {
            return res.status(404).json({ success: false, message: "Payment info not found" });
        }

        if (paymentInfo.payment_status !== "SUCCESS") {
            return res.json({ success: false, message: "Payment not successful" });
        }

        const payment = await Payment.findOne({ transactionId: orderId });
        const paymentId = payment?._id
        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment record not found" });
        }

        const userId = payment.user;
        const busId = payment.bus;
        const seats = payment.seatsBooked as number[]; // Assuming seatsBooked is an array of numbers

        if (!userId || !busId || !seats || seats.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid payment data" });
        }

        const bus = await Bus.findById(busId);
        const user = await User.findById(userId);

        if (!bus || !user) {
            return res.status(404).json({ success: false, message: "User or Bus not found" });
        }

        // Add booked seats to bus and user
        for (const seat of seats) {
            bus.bookedSeats.push({ seat, userId, paymentDetails: paymentId });
            user.bookedBus.push({ busId, seat, paymentDetails: paymentId });
        }

        await Promise.all([bus.save(), user.save()]);

        const paymethod: any = paymentInfo.payment_group

        payment.paymentMethod = paymethod;
        payment.paymentStatus = "completed";
        await payment.save();

        return res.json({ success: true, message: "Payment successful" });
    } catch (error: any) {
        console.error("Cashfree API error:", error.response?.data || error.message || error);
        return res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};

export default { verifyPayment };
