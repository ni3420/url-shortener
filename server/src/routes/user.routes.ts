import { Router } from "express";
import {handleGetCurrentUser, handleLogin,handleRegister,handleLogout} from "../controllers/user.controllers"
import auth from "../middlewares/auth"
const router=Router()

router.get("/current",auth,handleGetCurrentUser)
router.post("/sign-up",handleRegister)
router.post("/sign-in",handleLogin)
router.post("/logout",handleLogout)

export default router