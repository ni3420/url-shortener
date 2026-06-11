import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useGetCampaignById = (id: string) => {
  return useQuery({
    queryKey: ["campaign", id],
    queryFn: async () => {
      const res = await api.get(`/campaign/${id}`);
      return  res.data;

    },
    enabled: !!id,
    
  });
};