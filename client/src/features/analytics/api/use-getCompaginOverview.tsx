import { useQuery } from "@tanstack/react-query";
import type { BaseResponse, CampaignOverviewData } from "../types";
import api from "@/lib/api";

export const useGetCampaignOverview = (campaignId: string | undefined) => {
  const query= useQuery<CampaignOverviewData, Error>({
    queryKey: ["campaign", "overview", campaignId],
    queryFn: async () => {
      const {data} = await api.get<BaseResponse<CampaignOverviewData>>(
        `analytics/${campaignId}/overview`
      );
      return data.data;
    },
    enabled: !!campaignId,
    staleTime: 1000 * 60 * 5,
  });
  return query
};