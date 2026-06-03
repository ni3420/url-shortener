import type { Request, Response } from "express";
import crypto from "crypto";
import QRcode from "qrcode";
import Campaign from "../models/campaign.models";
import Url from "../models/url.models";
import AnalyticsModel from "../models/analytics.models";
import { extractUtmParameters } from "../service/extractUtmParameter";


export const handleCreateCampaign = async (req: Request, res: Response) => {
  try {
    const { title, tags, originalUrl } = req.body; 

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    if (!originalUrl) {
      return res.status(400).json({ success: false, message: "Original URL is required" });
    }

    const campaign = await Campaign.create({
      title,
      tags: tags || [],
    });

    let cleanUrl = originalUrl.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = "https://" + cleanUrl;
    }

    const shortCode = crypto.randomBytes(8).toString("base64url").substring(0, 6);
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const qrCodeUrl = await QRcode.toDataURL(`${baseUrl}/${shortCode}`);

    const newUrl = await Url.create({
      shortId: shortCode,
      originalUrl: cleanUrl,
      qrCodeUrl,
      campaignId: campaign._id,
    });

    const utmParams = extractUtmParameters(cleanUrl);

    const initialAnalytics = await AnalyticsModel.create({
      campaignId: campaign._id,
      device: "Desktop",
      browser: "System",
      country: "System",
      referrer: "Campaign Creation",
      ...utmParams,
    });

    return res.status(201).json({
      success: true,
      message: "Campaign, URL, and Initial Analytics created successfully",
      data: {
        campaign,
        url: newUrl,
        analytics: initialAnalytics
      },
    });

  } catch (err: any) {
    console.error("Error in handleCreateCampaign:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const handleGetAllCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: campaigns
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const handleGetCampaignById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("hii")

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: campaign
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const handleUpdateCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (req.body.custom_alias) {
      const exists = await Campaign.findOne({
        custom_alias: req.body.custom_alias,
        _id: { $ne: id }
      });

      if (exists) {
        return res.status(409).json({
          success: false,
          message: "custom_alias already exists"
        });
      }
    }

    const updated = await Campaign.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: updated
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const handleDeleteCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Campaign.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Campaign deleted successfully"
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};