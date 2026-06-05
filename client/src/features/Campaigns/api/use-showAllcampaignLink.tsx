import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface UrlItem {
  _id: string;
  shortId: string;
  title:string;
  originalUrl: string;
  qrCodeUrl?: string;
  clickCount: number;
  campaignId: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  urls: UrlItem[];
}

export const useGetCampaignUrls = (campaignId: string | undefined) => {
  return useQuery<UrlItem[]>({
    queryKey: ["campaign", campaignId],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse>(`/campaign/${campaignId}/links`);
      console.log(data)
      return data.urls;
    },
    enabled: !!campaignId,
    staleTime: 1000 * 60 * 5,
  });
};