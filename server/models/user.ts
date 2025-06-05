import mongoose, { Document, Schema } from "mongoose";

// 1. Define a type for bookedBus entries
interface BookedBus {
  busId: mongoose.Types.ObjectId;
  seat: number;
  paymentDetails: mongoose.Types.ObjectId;
}

// 2. Update IUser interface to reflect correct type
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  bookedBus: BookedBus[]; // changed from ObjectId[]
  addedBus: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

// 3. Mongoose schema
const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    bookedBus: [
      {
        busId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "bus",
        },
        seat: {
          type: Number,
        },
        paymentDetails: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "payment",
        },
      },
    ],
    addedBus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bus",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// 4. Export model
const User = mongoose.model<IUser>("user", UserSchema);
export default User;
