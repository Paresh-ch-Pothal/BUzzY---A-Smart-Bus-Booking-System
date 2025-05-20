import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const signupUser = async (req : Request, res : Response) => {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Please fill all the fields", success: false });
    }

    try {
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        const payload = {
            user: {
                id: newUser._id,
                role: newUser.role,
                name: newUser.name,
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!);

        return res.status(201).json({ message: "User created successfully", success: true, token, newUser });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", success: false });
        
    }
};


const loginUser = async (req : Request, res: Response) => {
    const {email, password, role } = req.body;
    
    if (!email || !password || !role) {
        return res.status(400).json({ message: "Please fill all the fields", success: false });
    }

    try {
        const user = await User.findOne({ email: email, role: role });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Credentials", success: false });
        }
        const payload = {
            user: {
                id: user._id,
                role: user.role,
                name: user.name,
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!);

        return res.status(201).json({ message: "User created successfully", success: true, token, user });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", success: false });
        
    }
};

export default {signupUser , loginUser}


