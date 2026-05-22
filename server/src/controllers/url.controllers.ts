import Url from "../models/url.models";
import type {  Request,Response } from "express";
import crypto from "crypto"
import QRcode from "qrcode"


const handleUrl=async(req:Request,res:Response)=>{
    try {
        const data = Object.values(req.body)[0];
        
        if(!data) return res.status(400).json({msg:"url is required"})
        const shortCode: string = crypto.randomBytes(8).toString('base64url').substring(0, 6);
        const url=await Url.create({
            short_Url:shortCode,
            original_Url:"https://"+(data as string).trim().replace(/^https?:\/\//, ''),
            QR_Code:await QRcode.toDataURL(`http://localhost:3000/${shortCode}`)
            
        })
        return res.status(201).json({msg:"url created"})
    } catch (error) {
        console.log(error)      
    }
}

const handleShowUrl=async(req:Request,res:Response)=>{
    try {
        const urls=await Url.find({})
        if(urls.length==0) return res.json({"msg":"not found the url"})
res.send(urls)            

    } catch (error) {
        console.log(error)
    }
}

const handleUrlDeletion=async(req:Request,res:Response)=>{
    try {
          const data = Object.values(req.body)[0];
          if(!data) return res.status(400).json({msg:"url is required"})
            const del=await Url.findOneAndDelete({short_Url:data as string})
        if(!del) return res.status(400).json({"msg":"url not found"})
            res.json({"msg":"delete the url successful"})
    } catch (error) {
        console.log(error)
        
    }
}

const handleOriginalUrl=async(req:Request,res:Response)=>{
    try {
        const url=req.params.shortId;
        if(!url) return res.status(404).json({"msg":"url not found"})
            const UrlData=await Url.findOneAndUpdate({short_Url:url},{
        $push:{
            TotalClicks:{
                timeStamp:Date.now()
            }
        }})
        if(!UrlData) return res.status(400).json({"msg":"not any url found"})
            
         return   res.json({"original_Url":`${UrlData.original_Url}`})
    } catch (error) {
        console.log(error)
        
    }
}




export {handleUrl,handleShowUrl,handleOriginalUrl,handleUrlDeletion}