import mongoose,{Schema,Document} from "mongoose";

interface Url extends Document{
    short_Url:string;
    original_Url:string;
    TotalClicks:string[]
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
TotalClicks:[{timeStamp:{
    type:Date,
}}]

},{timestamps:true})

const Url=mongoose.model("Url",UrlSchema)

export default Url