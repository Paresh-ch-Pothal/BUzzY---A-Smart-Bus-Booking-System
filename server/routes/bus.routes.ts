import express from "express";
import busController from '../controllers/bus.controller';
import fetchuser from "../middleware/fetchuser";

const router = express.Router();


router.post("/addBus", fetchuser, busController.addBus);
router.post("/bookBus/:id", fetchuser, busController.bookABus);
router.get("/searchBus", busController.searchBus);

export default router;
