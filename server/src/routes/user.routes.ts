import { Router } from "express";
import {handleGetCurrentUser, handleLogin,handleRegister} from "../controllers/user.controllers"

const router=Router()

router.get("/current",handleGetCurrentUser)
router.post("/sign-up",handleRegister)
router.post("/sign-in",handleLogin)

export default router