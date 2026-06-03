export interface BaseResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CampaignOverviewData {
  totalLinks: number;
  totalClicks: number;
}

export interface AggregationItem {
  _id: string | null;
  count: number;
}

export interface CampaignBreakdownData {
  devices: AggregationItem[];
  browsers: AggregationItem[];
  countries: AggregationItem[];
}

export interface CampaignUtmData {
  sources: AggregationItem[];
  mediums: AggregationItem[];
}

export interface TimelineItem {
  _id: string; // The formatted YYYY-MM-DD date string
  clicks: number;
}