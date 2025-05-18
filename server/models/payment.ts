import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bus",
      required: true,
    },
    seatsBooked: {
      type: [Number],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "wallet", "netbanking", "cash"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
})



const Payment = mongoose.model("payment", paymentSchema)
module.exports = Payment;