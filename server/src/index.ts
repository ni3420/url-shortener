import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { clerkMiddleware } from "@clerk/express";

import DB from "./db/dbconnection.js";

import urlRouter from "./routes/url.routes.js";
import userRouter from "./routes/user.routes.js";
import CampaignRouter from "./routes/campaign.routes.js";
import AnalyticsRouter from "./routes/analytics.routes.js";
import { requireAuthAndSync } from "./middlewares/auth.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    runtime: "node",
  });
});

app.use("/api/auth", userRouter);
app.use("/api/url", urlRouter);
app.use("/api/campaign", requireAuthAndSync, CampaignRouter);
app.use("/api/analytics", AnalyticsRouter);

const PORT = process.env.PORT || 3000;

DB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });