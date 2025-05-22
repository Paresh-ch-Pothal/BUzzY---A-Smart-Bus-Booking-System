import express from "express";
import userController from '../controllers/user.controller';
import fetchuser from "../middleware/fetchuser";

const router = express.Router();

// route for both user and admin signup
router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.get("/showBookings", fetchuser, userController.fetchBookedBus);
router.get("/showAddedBus", fetchuser, userController.fetchAddedBus);

export default router;
