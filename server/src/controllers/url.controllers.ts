import Url from "../models/url.models";
import type {  Request,Response } from "express";
import crypto from "crypto"
import QRcode from "qrcode"
import { extractUtmParameters } from "../service/extractUtmParameter";
import AnalyticsModel from "../models/analytics.models";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import mongoose from "mongoose";
import Campaign from "../models/campaign.models";
import type {AuthenticatedRequest} from "../types"


const handleUrl = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { urls } = req.body ;
    const userId = req.user?.id
    if(!urls)
    {
      return res.json({"msg":"url required"})
    }

    let cleanUrl = urls.trim() as string

    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = "https://" + cleanUrl;
    }

    const shortCode = crypto
      .randomBytes(8)
      .toString("base64url")
      .substring(0, 6);

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    const qrCodeUrl = await QRcode.toDataURL(`${baseUrl}/api/url/${shortCode}`);

    const url = await Url.create({
      shortId: shortCode,
      originalUrl: cleanUrl,
      qrCodeUrl,
      userId
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
const handleShowUrl = async (req: AuthenticatedRequest, res: Response) => {
  try {

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access context."
      });
    }
      // console.log(req.user)
    // Only find URLs where campaignId is explicitly null or does not exist
    const urls = await Url.find({
      userId: userId
    })

    if (!urls || urls.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No unassigned standalone redirect shortcuts discovered in database index."
      });
    }

    return res.status(200).json({
      success: true,
      data: urls
    });

  } catch (error: any) {
    console.error("Error inside handleShowUrl controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error reading URL registry metadata lines."
    });
  }
};
 const handleUrlDeletion = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { linkId } = req.body;


    const url=await Url.findOneAndDelete({shortId:linkId})

    if(!url)
    {
      return res.status(401).json({
        success:false,
        msg:"not deleted the url "
      })
    }

    return res.status(200).json({ 
      success: true, 
      message: "Shortened tracking routing link dropped successfully." 
    });

  } catch (error: any) {
    console.error("Error inside handleUrlDeletion controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error dropping link registry index configuration."
    });
  }
}
const handleOriginalUrl=async(req:Request,res:Response)=>{
    try {
        const url=req.params.shortId;
        if(!url) return res.status(404).json({"msg":"url not found"})
            const UrlData=await Url.findOneAndUpdate({shortId:url},{$inc:{clickCount:1}})
        if(!UrlData) return res.status(400).json({"msg":"not any url found"})
            
         return   res.redirect(UrlData.originalUrl)
    } catch (error) {
        console.log(error)
        
    }
}
const handleCampaignUrl = async (req: Request, res: Response) => {
  try {
    const { shortId } = req.params;
    if (!shortId) {
      return res.status(400).json({ msg: "shortId is required" });
    }

    const urlData = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clickCount: 1 } },
      { new: true }
    );

    if (!urlData) {
      return res.status(404).json({ msg: "Url is not found" });
    }

const parser = new UAParser(req.headers['user-agent']);
const result=parser.getResult()
    const ip =
  (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
  req.socket.remoteAddress ||
  "";
    const geo = geoip.lookup(ip);
    const baseUtmParameters = extractUtmParameters(urlData.originalUrl);

    await AnalyticsModel.create({
      campaignId: urlData.campaignId,
      device:result?.device.type,
      country: geo?.country,
      browser:result?.browser.name,
      ...baseUtmParameters,
    });

    return res.redirect(urlData.originalUrl);
  } catch (error) {
    console.error("Critical error in handleCampaignUrl redirection pipe:", error);
    return res.status(500).json({ msg: "Internal routing deployment exception" });
  }
};




export {handleUrl,handleShowUrl,handleOriginalUrl,handleUrlDeletion,handleCampaignUrl}