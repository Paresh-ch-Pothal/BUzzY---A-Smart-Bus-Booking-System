import express from 'express';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import fetchuser from '../middleware/fetchuser';
import Bus, { IBus } from '../models/bus';
import User, { IUser } from '../models/user';
import mongoose from 'mongoose';


interface AuthenticatedRequest extends Request {
    user: {
        _id: string,
        role: string,
        name: string
    }
}

const addBus = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { name, busNo, Ac_NonACtype, source,
            destination, noOfSleeper, noOfSeater,
            SleeperPrice, SeaterPrice, arrivalTime,
            departureTime } = req.body;
        if (!name || !busNo || !source || !destination || !noOfSleeper || !noOfSeater || !SleeperPrice || !SeaterPrice || !arrivalTime || !departureTime) {
            return res.status(400).json({ message: "Please fill all the fields", success: false })
        }
        console.log(req.user)
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to add a bus", success: false })
        }
        const bus : IBus = await Bus.create({
            name, busNo, Ac_NonACtype, source,
            destination, noOfSleeper, noOfSeater, SleeperPrice,
            SeaterPrice, arrivalTime, departureTime,
            addedBy: req.user?._id
        })

        const adminUser = await User.findById(req.user._id);
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin user not found', success: false });
        }

        adminUser.addedBus.push(bus._id);
        await adminUser.save();
        return res.status(201).json({ message: "Bus added successfully", success: true, bus })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", success: false })
    }
}


export default { addBus }

