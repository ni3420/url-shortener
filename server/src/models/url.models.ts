import mongoose, { Schema, Document } from "mongoose";

interface UrlTypes extends Document {
  shortId: string;
  originalUrl: string;
  campaignId?:mongoose.Types.ObjectId;
  qrCodeUrl?: string;
  user?: mongoose.Types.ObjectId;
  expireAt?: Date;
  clickCount: number;
}

const UrlSchema = new Schema<UrlTypes>(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    campaignId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Campaign",
      default:null
      
    },

    originalUrl: {
      type: String,
      required: true,
    },

    qrCodeUrl: {
      type: String,
    },

    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },

    expireAt: {
      type: Date,
      index: { expires: 0 },
    },

    clickCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Url = mongoose.model<UrlTypes>("Url", UrlSchema);

export default Url;