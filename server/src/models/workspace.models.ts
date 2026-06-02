import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";


interface WorkSpaceTypes extends Document{
    workspaceId:string,
    userId:mongoose.Types.ObjectId,
    name:string
}

const WorkspaceSchema=new Schema<WorkSpaceTypes>({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    workspaceId:{
        type:String,
        required:true,
    }

},{timestamps:true})

const Workspace=mongoose.models.Workspace || mongoose.model<WorkSpaceTypes>("Workspace",WorkspaceSchema)

export default Workspace