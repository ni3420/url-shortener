import { Router } from "express";
import { handleOriginalUrl, handleShowUrl, handleUrlDeletion, handleUrl,handleCampaignUrl } from "../controllers/url.controllers";
import {urlCreateLimiter,urlManipulateLimiter} from "../service/ratelimit"
import {requireAuthAndSync} from "../middlewares/auth"
const router=Router()

router.post("/",requireAuthAndSync,handleUrl)
router.get("/",requireAuthAndSync,handleShowUrl)
router.get("/:shortId",handleOriginalUrl)
router.get("/:shortId/campaign",handleCampaignUrl)

router.delete("/",requireAuthAndSync,handleUrlDeletion)

export default router