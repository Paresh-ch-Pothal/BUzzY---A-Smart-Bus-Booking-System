import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


// here we are using AuthenticatedRequest to get the user data from the token

interface AuthenticatedRequest extends Request {
    user:{
        _id: string,
        role: string
        name : string,
    }
}

const fetchuser = async(req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token : string = req.header('authtoken');
    if (!token) {
        res.status(401).json({ message: "Please Login or Signup to Access the resource", success: false })
    }
    const data = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!data) {
        res.status(401).json({ message: "Please Login or Signup to Access the resource", success: false })
    }
    try {
        req.user = data.user
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", success: false });
    }
}


export default fetchuser;
