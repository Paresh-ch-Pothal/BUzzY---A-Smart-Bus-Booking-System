"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDb_1 = __importDefault(require("./connectDb"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const bus_routes_1 = __importDefault(require("./routes/bus.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http'], // Allow these origins to make requests
    methods: ["POST", "GET", "OPTIONS"], // Allow these HTTP methods
    credentials: true, // Allow cookies and other credentials to be sent
    allowedHeaders: ["Content-Type", "Authorization", "authtoken"], // Allow the token header
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, connectDb_1.default)();
// all routes
app.use("/api/user", user_routes_1.default);
app.use("/api/bus", bus_routes_1.default);
app.use('/api/payment', payment_routes_1.default);
// Define your routes here
// For example: app.use('/api/users', userRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
