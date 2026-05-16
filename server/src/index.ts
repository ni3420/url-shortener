import express, { urlencoded, type Request, type Response } from "express"
import dotenv from "dotenv"
import DB from "./db/dbconnection"
import urlRouter from "./routes/url.routes"
import cors from "cors"
dotenv.config()
const app=express()
app.use(cors())

app.use(express.json())
app.use(urlencoded({extended:false}))


app.use("/api",urlRouter)






DB().then(()=>console.log("db is connected")).catch(()=>console.log("db connection is failed"))
app.listen(process.env.PORT,()=>console.log("server is start"))


