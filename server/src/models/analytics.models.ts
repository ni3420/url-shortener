import mongoose, { Schema, Document } from "mongoose";

interface Analytics extends Document {
    shortId: mongoose.Types.ObjectId;  
    device: string;                 
    browser: string;                
    country: string;                
    referrer: string;    
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    createdAt: Date;
    updatedAt: Date;           
}

const AnalyticsSchema = new Schema<Analytics>({
    shortId: { 
        type: Schema.Types.ObjectId, 
        ref: "Url", 
        required: true 
    },
    device: {
  type: String,
  enum: ["Desktop", "Mobile", "Tablet", "Bot"],
  default: "unknown"
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
    utm_source: {
        type: String,
        default: "organic" 
    },
    utm_medium: {
        type: String,
        default: "none"
    },
    utm_campaign: {
        type: String,
        default: "none"
    },
    utm_term: {
        type: String,
        default: "none"
    },
    utm_content: {
        type: String,
        default: "none"
    }

},{timestamps:true});

AnalyticsSchema.index({ shortId: 1, createdAt: -1 });

const AnalyticsModel = mongoose.models.Analytics || mongoose.model<Analytics>("Analytics", AnalyticsSchema);

export default AnalyticsModel;