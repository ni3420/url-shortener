import express from "express";
import dotenv from "dotenv";
import DB from "./db/dbconnection";
import urlRouter from "./routes/url.routes";
import userRouter from "./routes/user.routes";
import CampaignRouter from "./routes/campaign.routes";
import AnalyticsRouter from "./routes/analytics.routes";
import cookie from "cookie-parser";
import cors from "cors";
import {requireAuthAndSync} from "./middlewares/auth";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(clerkMiddleware())
app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));

app.use(cookie());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", runtime: "Bun" });
});

app.use("/api/auth", userRouter);
app.use("/api/url",  urlRouter);
app.use("/api/campaign", requireAuthAndSync, CampaignRouter);
app.use("/api/analytics", AnalyticsRouter);

const PORT = process.env.PORT || 3000;

DB()
  .then(() => {
    console.log("Database connection architecture initialized safely.");
    app.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`Server listening execution routing on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Critical: Database connection failed:", err);
    process.exit(1);
  });