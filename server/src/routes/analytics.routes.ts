import { Router } from "express";
import { 
  getCampaignOverview, 
  getCampaignBreakdown, 
  getCampaignUtmStats, 
  getCampaignTimeline 
} from "../controllers/analytics.controllers";

const router = Router();

router.get("/:campaignId/overview", getCampaignOverview);
router.get("/:campaignId/breakdown", getCampaignBreakdown);
router.get("/:campaignId/utm", getCampaignUtmStats);
router.get("/:campaignId/timeline", getCampaignTimeline);

export default router;