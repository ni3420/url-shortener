import Url from "../models/url.models";
import type {  Request,Response } from "express";

const handleUrl=async(req:Request,res:Response)=>{
    try {
        const data = Object.values(req.body)[0];
        if(!data) return res.status(400).json({msg:"url is required"})
        
        const shortCode:string = Math.random().toString(36).substring(2, 8);
    
        const url=await Url.create({
            short_Url:shortCode,
            original_Url:data as string  
        })
        return res.status(201).json({msg:"url created"})
    } catch (error) {
        console.log(error)      
    }
}

const handleShowUrl=async(req:Request,res:Response)=>{
    try {
        const urls=await Url.find({})
        if(!urls) return res.json({"msg":"not found the url"})
            console.log(urls)
    } catch (error) {
        console.log(error)
    }
}

const handleOriginalUrl=async(req:Request,res:Response)=>{
    try {
        const url=req.params.url
        if(!url) return res.status(404).json({"msg":"url not found"})
            const original_url=await Url.findOne({short_Url:url})
        console.log(original_url)
    } catch (error) {
        console.log(error)
        
    }
}

export {handleUrl,handleShowUrl,handleOriginalUrl}