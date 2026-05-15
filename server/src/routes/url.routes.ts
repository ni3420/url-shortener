import { Router } from "express";
import { handleOriginalUrl, handleShowUrl, handleUrl } from "../controllers/url.controllers";
const router=Router()

router.post("/",handleUrl)
router.get("/",handleShowUrl)
router.get("/:url",handleOriginalUrl)
export default router