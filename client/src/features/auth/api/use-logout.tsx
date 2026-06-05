import { useMutation,useQueryClient } from "@tanstack/react-query";
import {toast} from "sonner"
import {  useNavigate } from "react-router-dom";

import api from "@/lib/api";

export const useLogout=()=>{
    const queryClient=useQueryClient()
    const navigate=useNavigate()

    const logout = useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/auth/logout");
      return data;
    },
    onSuccess: () => {
      toast.success("Session closed successfully");
      
      queryClient.clear();
      
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Failed to safely close connection session");
    },
  });

 return logout
}