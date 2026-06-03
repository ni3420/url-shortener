import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { BaseResponse, CampaignOverviewData } from "../types";

export const useGetCampaignOverview = (campaignId: string | undefined) => {
  return useQuery<CampaignOverviewData, Error>({
    queryKey: ["campaign", "overview", campaignId],
    queryFn: async () => {
      const { data } = await axios.get<BaseResponse<CampaignOverviewData>>(
        `/api/analytics/${campaignId}/overview`
      );
      console.log("Campaign Overview Data:", data);
      return data.data;
    },
    enabled: !!campaignId,
    staleTime: 1000 * 60 * 5,
  });
};