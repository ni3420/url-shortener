import type {Request,Response,NextFunction} from "express"
import { getToken } from "../service/token"
const auth=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const decode=getToken(token)
        if(!decode){
            return res.status(401).json({message:"Unauthorized"})
        }
        next()
    }
    catch (error) {     
           return res.status(401).json({message:"Unauthorized"})
    }
}
export default auth