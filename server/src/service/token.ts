import jwt from "jsonwebtoken"

const secretKey = process.env.JWT_SECRET_KEY as string

const GenerateToken=(name:string,_id:string)=>{
    return jwt.sign({name,_id},secretKey )

}


const getToken=(token:string)=>{
    return jwt.verify(token,secretKey)

}

export {getToken,GenerateToken}