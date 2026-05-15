import mongoose from "mongoose";


const DB=async()=>{
    try {
        const connect=mongoose.connect(process.env.DB_URL as string )
    } catch (error) {
        console.log(error,"database not connected")
        process.exit(1)

        
    }
}

export default DB
