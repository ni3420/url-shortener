import { useMutation } from "@tanstack/react-query";
import  type { loginInput } from "../schema";
import api from "@/lib/api";

export const useLogin=()=>{
    const Mutation=useMutation({
        mutationFn:async(data:loginInput)=>{
            const res=await api.post("/auth/sign-in",data)
            console.log(res)
            return res.data
        }
    })
    return Mutation
}