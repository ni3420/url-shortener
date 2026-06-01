import { Router } from "express";
import { handleOriginalUrl, handleShowUrl, handleUrlDeletion, handleUrl } from "../controllers/url.controllers";
import {urlCreateLimiter,urlManipulateLimiter} from "../service/ratelimit"
import { handleUrlUtm } from "../controllers/analytics.controllers";
const router=Router()

router.post("/",urlCreateLimiter,handleUrl)
router.get("/",urlManipulateLimiter,handleShowUrl)
router.get("/:shortId",urlManipulateLimiter,handleUrlUtm)

router.delete("/",urlManipulateLimiter,handleUrlDeletion)

export default router