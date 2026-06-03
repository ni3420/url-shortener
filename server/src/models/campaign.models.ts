import mongoose ,{Document,Schema}from "mongoose";

interface CampaignType extends Document{
    title:string,
    tags?:string[]
}

const CampaignSchema=new Schema<CampaignType>({
    title:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    }



},{timestamps:true})

const Campaign= mongoose.model<CampaignType>("Campaign",CampaignSchema)

export default Campaign


