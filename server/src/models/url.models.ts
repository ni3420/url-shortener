import mongoose,{Schema,Document} from "mongoose";

interface Url extends Document{
    short_Url:string;
    original_Url:string;
    QR_Code:string;
    TotalClicks:string[]
    expireAt:Date
    user?:mongoose.Types.ObjectId
}


const UrlSchema=new Schema<Url>({
short_Url:{
type:String,
required:true,
unique:true,
index:true
},

original_Url:{
    type:String,
    required:true
},
QR_Code:{
    type:String,
    required:true
},
expireAt:{
    type:Date,
    default: Date.now,
    index:{expires:"1d"}
},
// user:{
//     type:Schema.Types.ObjectId,
//     ref:"User",
//     required:true
// },
TotalClicks:[{timeStamp:{
    type:Date,
}}]

},{timestamps:true})

const Url=mongoose.model("Url",UrlSchema)

export default Url