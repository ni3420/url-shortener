import { useMutation } from "@tanstack/react-query";
import type { CreateLinkFormInput } from "../Schema";
import api from "@/lib/api";

export const useCreateLink=()=>{
    const Mutation=useMutation({
        mutationFn:async(data:CreateLinkFormInput)=>{
            const res=await api.post("/url",data)
            return res.data
        }
    })
    return Mutation
}