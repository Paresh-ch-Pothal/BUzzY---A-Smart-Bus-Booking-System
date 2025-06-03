"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const fetchuser_1 = __importDefault(require("../middleware/fetchuser"));
const router = express_1.default.Router();
// route for both user and admin signup
router.post("/signup", user_controller_1.default.signupUser);
router.post("/login", user_controller_1.default.loginUser);
router.get("/showBookings", fetchuser_1.default, user_controller_1.default.fetchBookedBus);
router.get("/showAddedBus", fetchuser_1.default, user_controller_1.default.fetchAddedBus);
exports.default = router;
