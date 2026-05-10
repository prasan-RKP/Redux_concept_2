import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/userModel';

dotenv.config();

export const protectedRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(400).json({message: "UnAuthrized User"});

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedUser) return res.status(400).json({message: "UnAuthrized User"});

        const orgUser = await User.findById(decodedUser.userId).select("-password");

        req.user = orgUser;
        
    } catch (error) {
        
    }
}