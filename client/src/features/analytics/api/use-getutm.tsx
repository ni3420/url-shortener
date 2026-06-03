import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { BaseResponse, CampaignUtmData } from "../types";

export const useGetCampaignUtmStats = (campaignId: string | undefined) => {
  return useQuery<CampaignUtmData, Error>({
    queryKey: ["campaign", "utm", campaignId],
    queryFn: async () => {
      const { data } = await axios.get<BaseResponse<CampaignUtmData>>(
        `/api/campaign/${campaignId}/utm`
      );
      return data.data;
    },
    enabled: !!campaignId,
    staleTime: 1000 * 60 * 5,
  });
};