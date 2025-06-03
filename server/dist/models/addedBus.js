"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const addedBusSchema = new mongoose_1.default.Schema({
    busId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'bus'
    },
    admin: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user'
    },
});
const addedBus = mongoose_1.default.model('addedBus', addedBusSchema);
module.exports = addedBus;
