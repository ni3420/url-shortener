import express from "express";
import dotenv from "dotenv";
import DB from "./db/dbconnection";
import urlRouter from "./routes/url.routes";
import userRouter from "./routes/user.routes";
import CampaignRouter from "./routes/campaign.routes";
import AnalyticsRouter from "./routes/analytics.routes";
import cookie from "cookie-parser";
import cors from "cors";
import auth from "./middlewares/auth";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: "https://url-shortener-seven-ebon.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));

app.use(cookie());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", runtime: "Bun" });
});

app.use("/api/auth", userRouter);
app.use("/api/url",  urlRouter);
app.use("/api/campaign", auth, CampaignRouter);
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