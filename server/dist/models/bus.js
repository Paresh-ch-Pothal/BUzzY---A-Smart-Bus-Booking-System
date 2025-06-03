"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const BookedSeatSchema = new mongoose_1.Schema({
    seat: {
        type: Number,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    paymentDetails: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "payment",
    },
});
const BusSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    arrivalTime: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: Date,
    },
    departureDate: {
        type: Date,
    },
    bookedSeats: [BookedSeatSchema],
}, {
    timestamps: true,
});
const Bus = mongoose_1.default.model("bus", BusSchema);
exports.default = Bus;
