import { useMutation } from "@tanstack/react-query";
import  type { signupInput } from "../schema";
import api from "../../../lib/api";

export const useSignUp=()=>{
    const Mutation=useMutation({
        mutationFn:async(data:signupInput)=>{
            const res=await api.post("/auth/sign-up",data)
            console.log(res)
            return res.data
        }
    })
    return Mutation
}