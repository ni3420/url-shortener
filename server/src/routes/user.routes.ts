import { Router } from "express";
import {handleGetCurrentUser, handleLogin,handleRegister,handleLogout} from "../controllers/user.controllers"
import {requireAuthAndSync} from "../middlewares/auth"
const router=Router()

router.get("/current",requireAuthAndSync,handleGetCurrentUser)


export default router