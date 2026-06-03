import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { BaseResponse, CampaignBreakdownData } from "../types";

export const useGetCampaignBreakdown = (campaignId: string | undefined) => {
  return useQuery<CampaignBreakdownData, Error>({
    queryKey: ["campaign", "breakdown", campaignId],
  
  queryFn: async () => {
      const { data } = await axios.get<BaseResponse<CampaignBreakdownData>>(
        `/api/analytics/${campaignId}/breakdown`
      );
      console.log("Campaign Breakdown Data:", data);
      return data.data;
    },
    enabled: !!campaignId,
    staleTime: 1000 * 60 * 5,
  });
};