import { Router } from "express";
import {
  handleCreateCampaign,
  handleGetAllCampaigns,
  handleGetCampaignById,
  handleUpdateCampaign,
  handleDeleteCampaign,
  handleShowCampaignUrls,
  handleAddLinkToCampaign 
} from "../controllers/campaign.controllers";

const router = Router();

router.post("/", handleCreateCampaign);
router.get("/", handleGetAllCampaigns);
router.get("/:id", handleGetCampaignById);
router.put("/:id", handleUpdateCampaign);
router.delete("/:id", handleDeleteCampaign);

router.post("/:campaignId/links", handleAddLinkToCampaign);
router.get("/:campaignId/links", handleShowCampaignUrls);

export default router;