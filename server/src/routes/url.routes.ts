import { Router } from "express";
import { handleOriginalUrl, handleShowUrl, handleUrlDeletion, handleUrl } from "../controllers/url.controllers";
const router=Router()

router.post("/",handleUrl)
router.get("/",handleShowUrl)

router.get("/:shortId",handleOriginalUrl)
router.delete("/",handleUrlDeletion)

export default router