import mongoose, { Document, Schema } from "mongoose";
import Bus from "./bus";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  bookedBus: mongoose.Types.ObjectId[];
  addedBus: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

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
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookedBus",
      },
    ],
    addedBus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Bus,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("user", UserSchema);
export default User;
