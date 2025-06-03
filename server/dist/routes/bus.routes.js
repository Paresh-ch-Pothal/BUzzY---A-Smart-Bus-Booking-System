"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bus_controller_1 = __importDefault(require("../controllers/bus.controller"));
const fetchuser_1 = __importDefault(require("../middleware/fetchuser"));
const router = express_1.default.Router();
router.post("/addBus", fetchuser_1.default, bus_controller_1.default.addBus);
router.post("/bookBus/:id", fetchuser_1.default, bus_controller_1.default.bookABus);
router.post("/searchBus", bus_controller_1.default.searchBus);
router.post("/getStatusForBooked/:id", bus_controller_1.default.getBusDetails);
exports.default = router;
