import type { Request, Response } from "express";
import crypto from "crypto";
import QRcode from "qrcode";
import Campaign from "../models/campaign.models";
import Url from "../models/url.models";
import AnalyticsModel from "../models/analytics.models";
import { extractUtmParameters } from "../service/extractUtmParameter";
import mongoose from "mongoose";


export const handleCreateCampaign = async (req: Request, res: Response) => {
  try {
    const { title, tags } = req.body; 

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const campaign = await Campaign.create({
      title,
      tags: tags || [],
    });

    

    const shortCode = crypto.randomBytes(8).toString("base64url").substring(0, 6);
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const qrCodeUrl = await QRcode.toDataURL(`${baseUrl}/${shortCode}`);

    // const newUrl = await Url.create({
    //   shortId: shortCode,
    //   qrCodeUrl,
    //   campaignId: campaign._id,
    // });
    return res.status(201).json({
      success: true,
      message: "Campaign, URL, and Initial Analytics created successfully",
      data: {
        campaign,
        // url: newUrl,
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

    // ◄— .populate("links") tells Mongoose to lookup and swap the IDs for the actual Url documents
    const campaign = await Campaign.findById(id).populate("links");

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


export const handleShowCampaignUrls = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;

    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Missing target Campaign Identifier context from routing parameters."
      });
    }

    if (!mongoose.Types.ObjectId.isValid(campaignId as string)) {
      return res.status(400).json({
        success: false,
        message: "Malformed Campaign ID syntax string received."
      });
    }

    const urls = await Url.find({ campaignId: new mongoose.Types.ObjectId(campaignId as string) });

    if (!urls || urls.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tracking redirect targets discovered matching this specific campaign profile reference."
      });
    }

    return res.status(200).json({
      success: true,
      data: urls
    });

  } catch (error: any) {
    console.error("Error inside handleShowCampaignUrls controller:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal database retrieval failure."
    });
  }
};

export const handleAddLinkToCampaign = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;
    const { title, originalUrl } = req.body;

    if (!title || !originalUrl) {
      return res.status(400).json({ 
        success: false, 
        message: "Link identifying title and destination target URL are required parameters." 
      });
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ 
        success: false, 
        message: "Target campaign workspace node not found." 
      });
    }

    let cleanUrl = originalUrl.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = "https://" + cleanUrl;
    }

    const shortCode = crypto.randomBytes(8).toString("base64url").substring(0, 6);
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const qrCodeUrl = await QRcode.toDataURL(`${baseUrl}/${shortCode}`);

    const newUrl = await Url.create({
      title,
      shortId: shortCode,
      originalUrl: cleanUrl,
      qrCodeUrl,
      campaignId: campaign._id,
    });

    campaign.links = campaign.links || [];
    campaign.links.push(newUrl._id);
    await campaign.save();

    return res.status(201).json({
      success: true,
      message: "Additional tracking link pushed directly into campaign index.",
      data: newUrl,
    });
  } catch (err: any) {
    console.error("Error inside handleAddLinkToCampaign executor:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};