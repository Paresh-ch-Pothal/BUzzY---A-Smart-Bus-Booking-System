import express from "express";
import userController from '../controllers/user.controller';

const router = express.Router();

// route for both user and admin signup
router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);

export default router;
