import mongoose, { Schema, Document } from "mongoose";

interface Analytics extends Document {
    urlId: mongoose.Types.ObjectId;  
    device: string;                 
    browser: string;                
    country: string;                
    referrer: string;               
}

const AnalyticsSchema = new Schema<Analytics>({
    urlId: { 
        type: Schema.Types.ObjectId, 
        ref: "Url", 
        required: true 
    },
    device:{
        type:String,
        default:"Desktop"
    },
    country:{
        type:String,
        default:"unknown"
    },
    browser:{
        type:String,
        default:"unknown",
    },
    referrer:{
        type:String,
        default:"Direct"
    },

},{timestamps:true});

const AnalyticsModel = mongoose.models.Analytics || mongoose.model<Analytics>("Analytics", AnalyticsSchema);

export default AnalyticsModel;