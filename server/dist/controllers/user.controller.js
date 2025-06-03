"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Please fill all the fields", success: false });
    }
    try {
        const existUser = yield user_1.default.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield user_1.default.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        const payload = {
            user: {
                _id: newUser._id,
                role: newUser.role,
                name: newUser.name,
            },
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
        return res.status(201).json({ message: "User created successfully", success: true, token, newUser });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ message: "Please fill all the fields", success: false });
    }
    try {
        const user = yield user_1.default.findOne({ email: email, role: role });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials", success: false });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials", success: false });
        }
        const payload = {
            user: {
                _id: user._id,
                role: user.role,
                name: user.name,
            },
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
        return res.status(201).json({ message: "User created successfully", success: true, token, user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
});
// fetching all the buses booked by a particular user
const fetchBookedBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ message: "Please Login to view your booked buses", success: false });
        }
        const user = yield user_1.default.findById(userId)
            .populate("bookedBus.busId")
            .populate("bookedBus.paymentDetails");
        return res.status(200).json({ message: "Fetched all the booked buses", success: true, user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
});
// fetching all the buses added by a particular user
const fetchAddedBus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ message: "Please Login to view your added Buses", success: false });
        }
        if (req.user.role !== "admin") {
            return res.status(400).json({ message: "You are not authorized to view this resource", success: false });
        }
        const user = yield user_1.default.findById(userId).populate("addedBus");
        return res.status(200).json({ message: "Fetched all the added buses", success: true, user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
});
exports.default = { signupUser, loginUser, fetchBookedBus, fetchAddedBus };
