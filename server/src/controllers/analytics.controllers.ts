import type {Request,Response} from "express"
import AnalyticsModel from "../models/analytics.models"
import {UAParser} from "ua-parser-js"
import Url from "../models/url.models";

const handleUrlUtm=async(req:Request,res:Response)=>{
try {
    const {shortId}=req.params;
const OriginalUrl=await Url.findOne({short_Url:shortId})
if(!OriginalUrl)
{
    return res.json({"msg":"not found"})
}

   const { 
            utm_source, 
            utm_medium, 
            utm_campaign, 
            utm_term, 
            utm_content 
        } = req.query

        const userAgent = req.headers["user-agent"] || "";
        const referrer = req.headers["referer"] || "Direct"; 

        const parser = new UAParser(userAgent);
        const browser = parser.getBrowser().name || "unknown";
        const device=parser.getDevice().type || "Desktop"

        const analytics=await AnalyticsModel.create({
            shortId:OriginalUrl._id,
            device:device.charAt(0).toUpperCase() + device.slice(1),
            browser:browser,
            country: "unknown",
            referrer: referrer,
            utm_source: utm_source ? String(utm_source) : undefined,
            utm_medium: utm_medium ? String(utm_medium) : undefined,
            utm_campaign: utm_campaign ? String(utm_campaign) : undefined,
            utm_term: utm_term ? String(utm_term) : undefined,
            utm_content: utm_content ? String(utm_content) : undefined,

        })

        res.status(201).json({
            success: true,
            message: "Analytics tracked successfully",
            data: analytics
        });

} catch (error) {
    console.error("Error in analytics controller:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    
}
}

export {handleUrlUtm}