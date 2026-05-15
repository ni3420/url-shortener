import express, { type Request, type Response } from "express"
import dotenv from "dotenv"
import DB from "./db/dbconnection"
import urlRouter from "./routes/url.routes"


dotenv.config()
const app=express()

app.use(express.json())


app.use("/api",urlRouter)






DB().then(()=>console.log("db is connected")).catch(()=>console.log("db connection is failed"))
app.listen(process.env.PORT,()=>console.log("server is start"))


