"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchuser_1 = __importDefault(require("../middleware/fetchuser"));
const payment_controller_1 = __importDefault(require("../controllers/payment.controller"));
const router = express_1.default.Router();
router.post("/verify", fetchuser_1.default, payment_controller_1.default.verifyPayment);
exports.default = router;
