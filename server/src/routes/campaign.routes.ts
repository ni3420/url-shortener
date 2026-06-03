import { Router } from "express";
import {
  handleCreateCampaign,
  handleGetAllCampaigns,
  handleGetCampaignById,
  handleUpdateCampaign,
  handleDeleteCampaign
} from "../controllers/campaign.controllers"

const router = Router();

router.post("/", handleCreateCampaign);
router.get("/",handleGetAllCampaigns);
router.get("/:id", handleGetCampaignById);
router.put("/:id", handleUpdateCampaign);
router.delete("/:id", handleDeleteCampaign);

export default router;