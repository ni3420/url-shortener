import   {campaignSchema} from "../Schema"
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import api from "@/lib/api";
import {z} from "zod"

type CampaignInput=z.infer<typeof campaignSchema>

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CampaignInput) => {
      const res = await api.post("/campaign", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};