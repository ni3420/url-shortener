import mongoose ,{Document,mongo,Schema}from "mongoose";

interface CampaignType extends Document{
    title:string,
    tags?:string[],
    userId:mongoose.Types.ObjectId
    links?:Schema.Types.ObjectId[],
    count:[{ date: Date, clicks: Number }]
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
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    links: [
      {
        type: Schema.Types.ObjectId,
        ref: "Url",
      },
    ],
    count: [
      {
        date: { type: Date, default: Date.now },
        clicks: { type: Number, default: 0 }
      }
    ]


},{timestamps:true})

const Campaign= mongoose.model<CampaignType>("Campaign",CampaignSchema)

export default Campaign


