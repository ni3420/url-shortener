import type { Request, Response } from "express";
import mongoose from "mongoose";
import AnalyticsModel from "../models/analytics.models";
import Url from "../models/url.models";

export const getCampaignOverview = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(campaignId as string)) {
      return res.status(400).json({ success: false, message: "Invalid Campaign ID" });
    }

    const totalLinks = await Url.countDocuments({ campaignId });

    const totalClicksResult = await AnalyticsModel.aggregate([
      { $match: { campaignId: new mongoose.Types.ObjectId(campaignId as string) } },
      { $count: "totalClicks" }
    ]);

    const totalClicks = totalClicksResult[0]?.totalClicks || 0;

    return res.status(200).json({
      success: true,
      data: {
        totalLinks,
        totalClicks
      }
    });
  } catch (error: any) {
    console.error("Error in getCampaignOverview:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}


export const getCampaignBreakdown = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;
    const cid = new mongoose.Types.ObjectId(campaignId as string);

    const breakdown = await AnalyticsModel.aggregate([
      { $match: { campaignId: cid } },
      {
        $facet: {
          devices: [
            { $group: { _id: "$device", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          browsers: [
            { $group: { _id: "$browser", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 } 
          ],
          countries: [
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 } 
          ]
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data: breakdown[0]
    });
  } catch (error: any) {
    console.error("Error in getCampaignBreakdown:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCampaignUtmStats = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;
    const cid = new mongoose.Types.ObjectId(campaignId as string);

    const utmStats = await AnalyticsModel.aggregate([
      { $match: { campaignId: cid } },
      {
        $facet: {
          sources: [
            { $group: { _id: "$utm_source", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          mediums: [
            { $group: { _id: "$utm_medium", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ]
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data: utmStats[0]
    });
  } catch (error: any) {
    console.error("Error in getCampaignUtmStats:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};



export const getCampaignTimeline = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;
    const cid = new mongoose.Types.ObjectId(campaignId as string);

    const timeline = await AnalyticsModel.aggregate([
      { $match: { campaignId: cid } },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
        }
      },
      {
        $group: {
          _id: "$date",
          clicks: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }, 
      { $limit: 30 } 
    ]);

    return res.status(200).json({
      success: true,
      data: timeline
    });
  } catch (error: any) {
    console.error("Error in getCampaignTimeline:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};