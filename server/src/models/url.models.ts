import mongoose,{Schema,Document} from "mongoose";

interface Url extends Document{
    short_Url:string;
    original_Url:string;
}


const UrlSchema=new Schema<Url>({
short_Url:{
type:String,
required:true,
},

original_Url:{
    type:String,
    required:true
}

},{timestamps:true})

const Url=mongoose.model("Url",UrlSchema)

export default Url