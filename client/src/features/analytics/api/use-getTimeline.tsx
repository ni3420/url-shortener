import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { BaseResponse, TimelineItem } from "../types";

export const useGetCampaignTimeline = (campaignId: string | undefined) => {
  return useQuery<TimelineItem[], Error>({
    queryKey: ["campaign", "timeline", campaignId],
    queryFn: async () => {
      const { data } = await axios.get<BaseResponse<TimelineItem[]>>(
        `/api/analytics/${campaignId}/timeline`
      );
      return data.data;
    },
    enabled: !!campaignId,
    staleTime: 1000 * 60 * 5,
  });
};