import type { Request,Response } from "express";
import Workspace from "../models/workspace.models";

const handleCreateWorkspace=async(req:Request,res:Response)=>{
    try {
        const {name,workspaceId}=req.body
        if(!name || !workspaceId)
        {
            return res.status(401).json({"msg":"required all fields"})
        }
        const workspace=await Workspace.create({
            name,
            workspaceId
        })
        if(!workspace)
        {
   return res.status(401).json({"msg":"not create the workspace"})
        }
//just for checking in frontend
        res.json({
            success:true,
            data:workspace

        })
    } catch (error) {
        console.log(error)
        return res.json({"msg":"not creating the workspace"})
        
    }

}

export {handleCreateWorkspace}