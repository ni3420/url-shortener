import type { Request, Response } from "express";
import AnalyticsModel from "../models/analytics.models";
import { UAParser } from "ua-parser-js";
import Url from "../models/url.models";

const handleUrlUtm = async (req: Request, res: Response) => {
  try {
    const { shortId } = req.params;

    const originalUrl = await Url.findOne({ short_Url: shortId });

    if (!originalUrl) {
      return res.status(404).json({ msg: "Not found" });
    }

    const userAgent = req.headers["user-agent"] || "";
    const referrer = req.get("referer") || "direct";

    const parser = new UAParser(userAgent);

    const browser = parser.getBrowser().name || "unknown";
    const deviceType = parser.getDevice().type || "desktop";

    const urlObj = new URL(originalUrl.original_Url);

    const utm_source = urlObj.searchParams.get("utm_source");
    const utm_medium = urlObj.searchParams.get("utm_medium");
    const utm_campaign = urlObj.searchParams.get("utm_campaign");
    const utm_term = urlObj.searchParams.get("utm_term");
    const utm_content = urlObj.searchParams.get("utm_content");

    const analytics = await AnalyticsModel.create({
      shortId: originalUrl._id,
      device: deviceType.charAt(0).toUpperCase() + deviceType.slice(1),
      browser,
      referrer,
      utm_source: utm_source || "organic",
      utm_medium: utm_medium || "none",
      utm_campaign: utm_campaign || "none",
      utm_term: utm_term || "none",
      utm_content: utm_content || "none"
    });

    return res.status(200).redirect(originalUrl.original_Url)

  } catch (error) {
    console.error("Error in analytics controller:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

 const handleGetAllAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await AnalyticsModel.find();
    return res.status(200).json({ success: true, data: analytics });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const handleGetSingleAnalytics = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const analytics = await AnalyticsModel.findOne({shortId:id});

    if (!analytics) {
      return res.status(404).json({
        success: false,
        message: "Analytics not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export { handleUrlUtm ,handleGetAllAnalytics,handleGetSingleAnalytics}