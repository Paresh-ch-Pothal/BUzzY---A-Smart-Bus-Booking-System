import mongoose, { mongo, Schema } from "mongoose";
import { Document } from "mongoose";

interface payment extends Document{
  user: mongoose.Types.ObjectId,
  bus: mongoose.Types.ObjectId,
  seatsBooked: number[],
  amount: number,
  paymentStatus: "pending" | "completed" | "failed";
  paymentMethod: "card" | "upi" | "wallet" | "netbanking" | "cash";
  transactionId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const paymentSchema: Schema<payment> = new Schema({
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


const Payment = mongoose.model<payment>("payment", paymentSchema);
export default Payment;