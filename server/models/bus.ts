import mongoose, { Document, Schema } from "mongoose";

// Interface for a booked seat
interface IBookedSeat {
  seat: number;
  userId: mongoose.Types.ObjectId;
  paymentDetails: mongoose.Types.ObjectId;
}


export interface IBus extends Document{
    name: string,
    busNo: string,
    Ac_NonACtype: "Ac" | "NON_AC",
    source: string,
    destination: string,
    noOfSleeper?: number,
    noOfSeater?: number,
    SleeperPrice? : number,
    SeaterPrice? : number,
    addedBy: mongoose.Types.ObjectId,
    arrivalTime?: Date,
    departureTime?: Date,
    bookedSeats: IBookedSeat[],
    createdAt?: Date,
    updatedAt?: Date,
}

const BookedSeatSchema = new Schema<IBookedSeat>(
  {
    seat: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    paymentDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment",
    },
  }
);

const BusSchema: Schema<IBus> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    busNo: {
      type: String,
      required: true,
    },
    Ac_NonACtype: {
      type: String,
      enum: ["Ac", "NON_AC"],
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    noOfSleeper: {
      type: Number,
    },
    noOfSeater: {
      type: Number,
    },
    SleeperPrice: {
      type: Number,
    },
    SeaterPrice: {
      type: Number,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    arrivalTime: {
      type: Date,
    },
    departureTime: {
      type: Date,
    },
    bookedSeats: [BookedSeatSchema],
  },
  {
    timestamps: true,
  }
);

const Bus = mongoose.model<IBus>("bus", BusSchema);
export default Bus;
