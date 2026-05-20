import type { Request, Response} from 'express';
import UserModel from '../models/user.models';
import bcrypt from 'bcrypt';
import {getToken,GenerateToken} from "../service/token"


const handleRegister=async (req:Request, res:Response) => {
const {email,name,password}=req.body
if(!email||!name||!password) return res.status(400).json({message:"All fields are required"})
try {
    const existingUser=await UserModel.findOne({email})
    if(existingUser) return res.status(400).json({message:"User already exists"})
    const user=await UserModel.create({email,name,password})    
    res.status(201).json({message:"User registered successfully",user})
} catch (error) {
    res.status(500).json({message:"Server error",error})
}
}


const handleLogin=async (req:Request, res:Response) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
            const token=GenerateToken(user.name, user.email);
            res.cookie("token",token,{httpOnly:true,secure:true})
        res.status(200).json({message: 'Login successful', user});
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
}


export {handleLogin,handleRegister}
