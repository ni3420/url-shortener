import express, { urlencoded, type Request, type Response } from "express"
import dotenv from "dotenv"
import DB from "./db/dbconnection"
import urlRouter from "./routes/url.routes"
import userRouter from "./routes/user.routes"
import CampaignRouter from "./routes/campaign.routes"
import AnalyticsRouter from "./routes/analytics.routes"
import cookie from "cookie-parser"
import cors from "cors"
import auth from "./middlewares/auth"
dotenv.config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }))
app.use(cookie())


app.use("/api/auth",userRouter)
app.use("/api/url",urlRouter)
app.use("/api/campaign",CampaignRouter)
app.use("/api/analytics",AnalyticsRouter)






DB().then(()=>console.log("db is connected")).catch(()=>console.log("db connection is failed"))
app.listen(process.env.PORT || "3000",()=>console.log("server is start"))


