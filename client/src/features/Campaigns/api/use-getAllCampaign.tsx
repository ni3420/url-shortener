import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useGetAllCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await api.get("/campaign");
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
    
  });
};