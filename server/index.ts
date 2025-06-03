import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connectDb";
import userRoutes from './routes/user.routes';
import busRoutes from './routes/bus.routes'
import paymentRoutes from './routes/payment.routes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174','http'], // Allow these origins to make requests
    methods: ["POST", "GET", "OPTIONS"], // Allow these HTTP methods
    credentials: true, // Allow cookies and other credentials to be sent
    allowedHeaders: ["Content-Type", "Authorization", "authtoken"], // Allow the token header
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// all routes
app.use("/api/user",userRoutes)
app.use("/api/bus",busRoutes)
app.use('/api/payment',paymentRoutes)

// Define your routes here
// For example: app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


export default app;