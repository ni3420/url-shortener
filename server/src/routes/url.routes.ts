import { Router } from "express";
import { handleOriginalUrl, handleShowUrl, handleUrlDeletion, handleUrl,handleCampaignUrl } from "../controllers/url.controllers";
import {urlCreateLimiter,urlManipulateLimiter} from "../service/ratelimit"
import auth from "../middlewares/auth"
const router=Router()

router.post("/",urlCreateLimiter,auth,handleUrl)
router.get("/",urlManipulateLimiter,auth,handleShowUrl)
router.get("/:shortId",urlManipulateLimiter,handleOriginalUrl)
router.get("/:shortId/campaign",handleCampaignUrl)

router.delete("/",urlManipulateLimiter,auth,handleUrlDeletion)

export default router