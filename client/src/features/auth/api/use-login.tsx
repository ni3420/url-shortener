import { useMutation } from "@tanstack/react-query";
import  type { loginInput } from "../schema";
import {useNavigate} from "react-router-dom"
import api from "@/lib/api";

export const useLogin=()=>{
    const navigate=useNavigate()
    const Mutation=useMutation({
        mutationFn:async(data:loginInput)=>{
            const res=await api.post("/auth/sign-in",data)
            return res.data
            
        },
        onSuccess:()=>{
   navigate("/home", { replace: true });
            
        }
    })
    return Mutation
}