import type { Request, Response } from 'express';
import UserModel from '../models/user.models';
import bcrypt from 'bcrypt';
import { GenerateToken } from "../service/token";

const handleGetCurrentUser = async (req: Request, res: Response) => {
    try {
        const session = req.cookies?.token;
        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Current session running",
        });
    } catch (error) {
        console.error("Get Current User Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const handleRegister = async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ 
            success: false,
            message: "All fields are required" 
        });
    }

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({ 
            email, 
            name, 
            password: hashedPassword 
        });    

        return res.status(201).json({ 
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ 
            success: false,
            message: "Something went wrong on our end. Please try again later." 
        });
    }
}

const handleLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            success: false,
            message: 'Email and password are required' 
        });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }  

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        const token = GenerateToken(user.name, user.email);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({ 
            success: true,
            message: 'Login successful', 
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ 
            success: false,
            message: 'Something went wrong on our end. Please try again later.' 
        });
    }
}

export { handleLogin, handleRegister, handleGetCurrentUser };