import { useQuery } from "@tanstack/react-query";
import type { BaseResponse, CampaignBreakdownData } from "../types";
import api from "@/lib/api";

export const useGetCampaignBreakdown = (campaignId: string | undefined) => {
  return useQuery<CampaignBreakdownData, Error>({
    queryKey: ["campaign", "breakdown", campaignId],
  
  queryFn: async () => {
      const { data } = await api.get<BaseResponse<CampaignBreakdownData>>(
        `analytics/${campaignId}/breakdown`
      );
      return data.data;
    },
    enabled: !!campaignId,
    staleTime: 1000 * 60 * 5,
  });
};