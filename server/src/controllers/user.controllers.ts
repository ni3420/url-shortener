import type { Request,Response } from "express";
import UserModel from "../models/user.models";
import bcrypt from "bcrypt"

const handleSignUp=async(req:Request,res:Response)=>{
    const {email,password,name}=req.body
    if(!email||!name||!password) return res.status(400).json({"msg":"required all field"})
        try {
            const user=await UserModel.create(email,name,password)
        return res.status(200).json({"msg":"user will created",user})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({"msg":"server error"})
            
        }
}


const handleSignIn=async(req:Request,res:Response)=>{
    const {email,password}=req.body;
    if(!email||!password) return res.status(400).json({"msg":"all field required"})
        try{
    const user=await UserModel.findOne({email:email})
    if(!user) return res.status(404).json({"msg":"invalid email or password"})
        const pass=await bcrypt.compare(password,user.password)
    if(pass)
    {
        res.status(200).json({"msg":"user is login"})
    }
    }catch(err)
    {
        console.log(err)
    }
}




export {handleSignIn,handleSignUp}
