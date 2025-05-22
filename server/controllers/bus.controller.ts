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



// booking a bus by the user
// const bookABus = async(req : AuthenticatedRequest , res : Response) =>{
//     try {
//         const userId=req.user._id;
//         if(!userId){
//             return res.status(400).json({ message: "Please login to book a bus", success: false })
//         }
//         const {seat} = req.body;
//         if(!seat){
//             return res.status(400).json({ message: "Please select a seat", success: false })    
//         }
//         const busId = req.params.id
//         const bus = await Bus.findById(busId);
//         if(!bus){
//             return res.status(404).json({ message: "Bus not found", success: false })
//         }
//         // here i am checking if the seat is already booked or not
//         const bookedSeat = bus.bookedSeats.map((b) => b.seat == seat);
//         if(bookedSeat.includes(true)){
//             return res.status(400).json({ message: "Seat already booked", success: false })
//         }
//         bus.bookedSeats.push({seat,userId: userId});
//         await bus?.save()
//         const user = await User.findById(userId);
//         user?.bookedBus.push({busId: busId,seat : seat});
//         await user?.save()
//         return res.status(200).json({ message: "Bus booked successfully", success: true, bus })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "Internal server error", success: false })
//     }
// }

const bookABus = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ message: "Please login to book a bus", success: false });
        }

        const { seat } = req.body;

        if (!seat || !Array.isArray(seat) || seat.length === 0) {
            return res.status(400).json({ message: "Please select at least one seat", success: false });
        }

        const busId = req.params.id;
        const bus = await Bus.findById(busId);

        if (!bus) {
            return res.status(404).json({ message: "Bus not found", success: false });
        }

        // Get all already booked seat numbers
        const bookedSeatNumbers = bus.bookedSeats.map((b) => b.seat);

        // Check if any of the requested seats are already booked
        const alreadyBooked = seat.filter(s => bookedSeatNumbers.includes(s));
        if (alreadyBooked.length > 0) {
            return res.status(400).json({ 
                message: `Seats already booked: ${alreadyBooked.join(", ")}`, 
                success: false 
            });
        }

        // Book each seat
        seat.forEach(s => {
            bus.bookedSeats.push({ seat: s, userId });
        });
        await bus.save();

        const user = await User.findById(userId);
        seat.forEach(s => {
            user?.bookedBus.push({ busId, seat: s });
        });
        await user?.save();

        return res.status(200).json({ message: "Bus booked successfully", success: true, bus });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};



//search functionality for the bus where the user type source , destination and departure date
const searchBus = async(req : Request, res: Response) =>{
    try {
        const {source , destination , startDate} = req.body;
        if(!source || !destination || !startDate){
            return res.status(400).json({ message: "Please fill all the fields", success: false })
        }

        //normalizing the inputs
        const querySource = String(source).trim().toLowerCase();
        const queryDestination = String(destination).trim().toLowerCase();
        const queryDate = new Date(String(startDate));

        const startOfDay = new Date(queryDate);
        queryDate.setHours(0,0,0,0);

        const endOfDay = new Date(queryDate);
        endOfDay.setHours(23,59,59,999);

        const buses = await Bus.find({
            source: { $regex: new RegExp(`^${querySource}$`, 'i') }, // case-insensitive exact match
            destination: { $regex: new RegExp(`^${queryDestination}$`, 'i') },
            departureTime: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        })

        if(buses.length == 0){
            return res.status(404).json({ message: "No buses found", success: false })
        }
        return res.status(200).json({ message: "Buses found", success: true, buses })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error", success: false})
    }
}


export default { addBus , bookABus , searchBus}

