import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { BaseResponse, CampaignUtmData } from "../types";

export const useGetCampaignUtmStats = (campaignId: string | undefined) => {
  return useQuery<CampaignUtmData, Error>({
    queryKey: ["campaign", "utm", campaignId],
    queryFn: async () => {
      const { data } = await axios.get<BaseResponse<CampaignUtmData>>(
        `/api/analytics/${campaignId}/utm`
      );
      console.log(data)
      if(!data)
      {
        console.log("error")
      }
      return data.data;
    },
    enabled: !!campaignId,
    staleTime: 1000 * 60 * 5,
  });
};