import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const useGetAllLinks=()=>{
    const query=useQuery({
        queryKey:["links"],
        queryFn:async()=>{
            const res=await api.get("/url")
            return res.data
        }
    })
    return query
}