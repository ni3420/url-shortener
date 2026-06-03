import type  {CampaignInput} from "../Schema"
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import api from "@/lib/api";

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CampaignInput>;
    }) => {
      const res = await api.put(`/campaign/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({
        queryKey: ["campaign", variables.id],
      });
    },
  });
};