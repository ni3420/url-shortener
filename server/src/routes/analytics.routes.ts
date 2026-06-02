import { Router } from "express";
import { handleGetAllAnalytics, handleGetSingleAnalytics } from "../controllers/analytics.controllers";
const router=Router()

router.get("/",handleGetAllAnalytics)
router.get("/:id",handleGetSingleAnalytics)

export default router