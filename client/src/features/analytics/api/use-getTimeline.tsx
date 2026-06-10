import { useQuery } from "@tanstack/react-query";
import type { BaseResponse, TimelineItem } from "../types";
import api from "@/lib/api";

export const useGetCampaignTimeline = (campaignId: string | undefined) => {
  return useQuery<TimelineItem[], Error>({
    queryKey: ["campaign", "timeline", campaignId],
    queryFn: async () => {
      const { data } = await api.get<BaseResponse<TimelineItem[]>>(
        `analytics/${campaignId}/timeline`
      );
      console.log(data)
      return data.data
    },
    enabled: !!campaignId,
    staleTime: 1000 * 60 * 5,
  });
};