import { Router } from "express";
import { handleOriginalUrl, handleShowUrl, handleUrlDeletion, handleUrl,handleCampaignUrl } from "../controllers/url.controllers";
import {urlCreateLimiter,urlManipulateLimiter} from "../service/ratelimit"
import {requireAuthAndSync} from "../middlewares/auth"
const router=Router()

router.post("/",urlCreateLimiter,requireAuthAndSync,handleUrl)
router.get("/",urlManipulateLimiter,requireAuthAndSync,handleShowUrl)
router.get("/:shortId",urlManipulateLimiter,handleOriginalUrl)
router.get("/:shortId/campaign",handleCampaignUrl)

router.delete("/",urlManipulateLimiter,requireAuthAndSync,handleUrlDeletion)

export default router