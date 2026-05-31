import mongoose, { Schema } from "mongoose";

 interface UtmBuilderTypes {
    userId: mongoose.Types.ObjectId; 
    originalUrl: string;              
    utm_source: string;               
    utm_medium: string;               
    utm_campaign: string;             
    utm_term?: string;                
    utm_content?: string;             
    generatedFullUrl: string;         
    createdAt: Date;
    updatedAt: Date;
}

const UtmBuilderSchema = new Schema<UtmBuilderTypes>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",                  
        required: false
    },
    originalUrl: {
        type: String,
        required: [true, "Original URL is required"],
        trim: true
    },
    utm_source: {
        type: String,
        required: [true, "UTM Source is required"],
        trim: true,
        lowercase: true               
    },
    utm_medium: {
        type: String,
        required: [true, "UTM Medium is required"],
        trim: true,
        lowercase: true
    },
    utm_campaign: {
        type: String,
        required: [true, "UTM Campaign is required"],
        trim: true,
        lowercase: true
    },
    utm_term: {
        type: String,
        trim: true,
        default: ""
    },
    utm_content: {
        type: String,
        trim: true,
        default: ""
    },
    generatedFullUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

UtmBuilderSchema.index({ userId: 1, createdAt: -1 });

const UtmBuilderModel = mongoose.models.UtmBuilder || mongoose.model<UtmBuilderTypes>("Utm", UtmBuilderSchema);

export default UtmBuilderModel;