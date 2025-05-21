import mongoose, { Document, Schema } from "mongoose";

// Interface for BookedBus
export interface IBookedBus extends Document {
  busId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  seat: number;
  paymentDetails: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const BookedBusSchema: Schema<IBookedBus> = new mongoose.Schema(
  {
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bus",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    seat: {
      type: Number,
      required: true,
    },
    paymentDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment",
    },
  },
  {
    timestamps: true,
  }
);

const BookedBus = mongoose.model<IBookedBus>("bookedBus", BookedBusSchema);
export default BookedBus;
