import { Router } from "express";
import { handleOriginalUrl, handleShowUrl, handleUrlDeletion, handleUrl } from "../controllers/url.controllers";
import {urlCreateLimiter,urlManipulateLimiter} from "../service/ratelimit"
const router=Router()

router.post("/",urlCreateLimiter,handleUrl)
router.get("/",urlManipulateLimiter,handleShowUrl)

router.get("/:shortId",urlManipulateLimiter,handleOriginalUrl)
router.delete("/",urlManipulateLimiter,handleUrlDeletion)

export default router