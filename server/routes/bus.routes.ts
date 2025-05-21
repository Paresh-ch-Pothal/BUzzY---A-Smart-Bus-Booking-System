import express from "express";
import busController from '../controllers/bus.controller';
import fetchuser from "../middleware/fetchuser";

const router = express.Router();

// route for both user and admin signup
router.post("/addBus", fetchuser, busController.addBus);

export default router;
