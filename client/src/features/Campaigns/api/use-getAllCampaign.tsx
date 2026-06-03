import { useQuery} from "@tanstack/react-query";
import api from "@/lib/api";

export const useGetAllCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await api.get("/campaign");
      return res.data;
    },
  });
};
