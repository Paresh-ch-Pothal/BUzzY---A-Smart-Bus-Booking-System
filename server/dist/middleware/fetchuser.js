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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fetchuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('authtoken');
    if (!token) {
        res.status(401).json({ message: "Please Login or Signup to Access the resource", success: false });
    }
    const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!data) {
        res.status(401).json({ message: "Please Login or Signup to Access the resource", success: false });
    }
    try {
        req.user = data.user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
});
exports.default = fetchuser;
