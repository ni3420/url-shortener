import express, { urlencoded, type Request, type Response } from "express"
import dotenv from "dotenv"
import DB from "./db/dbconnection"
import urlRouter from "./routes/url.routes"
import userRouter from "./routes/user.routes"
import cookie from "cookie-parser"
import cors from "cors"
dotenv.config()
const app=express()
app.use(express.json())

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }))
app.use(cookie())
app.use(express.json())
app.use(urlencoded({extended:false}))



app.use("/api",urlRouter)
app.use("/api/auth",userRouter)






DB().then(()=>console.log("db is connected")).catch(()=>console.log("db connection is failed"))
app.listen(process.env.PORT,()=>console.log("server is start"))


