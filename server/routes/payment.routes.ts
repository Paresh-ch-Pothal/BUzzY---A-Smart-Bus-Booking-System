import express from "express";
import fetchuser from "../middleware/fetchuser";
import paymentController from "../controllers/payment.controller";


const router = express.Router()

router.post("/verify",fetchuser,paymentController.verifyPayment);

export default router;