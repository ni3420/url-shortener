import Url from "../models/url.models";
import type {  Request,Response } from "express";
import crypto from "crypto"
import QRcode from "qrcode"


const handleUrl = async (req: Request, res: Response) => {
  try {
    const { originalUrl, campaignId } = req.body;

    if (!campaignId) {
      return res.status(400).json({ msg: "campaign is required" });
    }

    let cleanUrl = originalUrl.trim();

    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = "https://" + cleanUrl;
    }

    const shortCode = crypto
      .randomBytes(8)
      .toString("base64url")
      .substring(0, 6);

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    const qrCodeUrl = await QRcode.toDataURL(`${baseUrl}/${shortCode}`);

    const url = await Url.create({
      shortId: shortCode,
      originalUrl: cleanUrl,
      qrCodeUrl,
      campaignId: campaignId || null,
    });

    return res.status(201).json({
      msg: "url created",
      data: url,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "server error" });
  }
};
const handleShowUrl=async(req:Request,res:Response)=>{
    try {
        const urls=await Url.find({}).populate("campaignId")
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
        console.log("hii")
        if(!url) return res.status(404).json({"msg":"url not found"})
            const UrlData=await Url.findOneAndUpdate({shortId:url},{
        $push:{
            TotalClicks:{
                timeStamp:Date.now()
            }
        }})
        if(!UrlData) return res.status(400).json({"msg":"not any url found"})
            
         return   res.json({"original_Url":`${UrlData.originalUrl}`})
    } catch (error) {
        console.log(error)
        
    }
}




export {handleUrl,handleShowUrl,handleOriginalUrl,handleUrlDeletion}