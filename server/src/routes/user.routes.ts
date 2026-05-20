import { Router } from "express";
import {handleLogin,handleRegister} from "../controllers/user.controllers"

const router=Router()

router.post("/sign-up",handleRegister)
router.post("/sign-in",handleLogin)

export default router