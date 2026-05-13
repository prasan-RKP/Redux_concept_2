import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/userModel.js';

dotenv.config();

export const protectedRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message: "Unauthorized User"});

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedUser) return res.status(401).json({message: "Unauthorized User"});

        const orgUser = await User.findById(decodedUser.userId).select("-password");
        if(!orgUser) return res.status(401).json({message: "User not found"});

        req.user = orgUser;
        next(); // ✅ THIS was missing

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized User" }); // ✅ errors handled
    }
}