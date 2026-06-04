import mongoose ,{Document,Schema}from "mongoose";

interface CampaignType extends Document{
    title:string,
    tags?:string[],
    links?:Schema.Types.ObjectId[]
}

const CampaignSchema=new Schema<CampaignType>({
    title:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    links: [
      {
        type: Schema.Types.ObjectId,
        ref: "Url",
      },
    ],


},{timestamps:true})

const Campaign= mongoose.model<CampaignType>("Campaign",CampaignSchema)

export default Campaign


