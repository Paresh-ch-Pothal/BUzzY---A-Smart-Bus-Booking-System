"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookedBusSchema = new mongoose_1.default.Schema({
    busId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "bus",
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    seat: {
        type: Number,
        required: true,
    },
    paymentDetails: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "payment",
    },
}, {
    timestamps: true,
});
const BookedBus = mongoose_1.default.model("bookedBus", BookedBusSchema);
exports.default = BookedBus;
