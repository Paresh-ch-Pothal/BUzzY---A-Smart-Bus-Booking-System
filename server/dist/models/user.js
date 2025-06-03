"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bus_1 = __importDefault(require("./bus"));
const UserSchema = new mongoose_1.default.Schema({
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
    bookedBus: [{
            busId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "bus",
            },
            seat: {
                type: Number
            },
            paymentDetails: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "payment",
            },
        }
    ],
    addedBus: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: bus_1.default,
        },
    ],
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("user", UserSchema);
exports.default = User;
