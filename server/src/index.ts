import express, { type Request, type Response } from "express"
const app=express()

app.get("/",(req:Request,res:Response)=>{
    res.send("start with New Project")
})

app.listen(3000,()=>console.log("server is start"))


