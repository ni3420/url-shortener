"use client";

import { useState } from "react";
import { 
  HiOutlineFolder, 
  HiOutlineLink, 
  HiOutlineArrowUpRight,
  HiOutlineCircleStack,
  HiOutlineMagnifyingGlass,
  HiOutlineChartBar
} from "react-icons/hi2";
import { HiOutlineCursorClick } from "react-icons/hi";
import { useGetAllCampaigns } from "@/features/Campaigns/api/use-getAllCampaign";
import ListCampaignCard from "@/features/Campaigns/components/ListAllCampaign";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";

type CountType={
  _id:string,
  clicks:number

}

interface CampaignItem {
  _id: string;
  shortId: string;
  title: string;
  originalUrl: string;
  count?: CountType[];
  clickCount?: number;
  links?: string[];
}

const OverViewPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: campaignResponse, isLoading: isCampaignsLoading, error: campaignError } = useGetAllCampaigns();
  
  const campaigns: CampaignItem[] = campaignResponse?.data || [];

  if (isCampaignsLoading) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center bg-base-100 dark:bg-zinc-950">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (campaignError) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="alert alert-error max-w-xl mx-auto rounded-xl shadow-lg text-white">
          <span>Failed to sync operational dashboard components. Verify server connectivity layers.</span>
        </div>
      </div>
    );
  }

  const totalCampaignsCount = campaigns.length;
  
  const totalClicksCount = campaigns.reduce((acc, curr) => {
    const backendSum = Array.isArray(curr.count) ? curr.count.length : 0;
    return acc + (curr.clickCount || backendSum || 0);
  }, 0);

  const totalLinksCount = campaigns.reduce((acc, curr) => acc + (curr.links?.length || 0), 0);

  const chartData = campaigns.map((campaign) => {
    const extractedClicks = Array.isArray(campaign.count) ? campaign.count.length : 0;
    return {
      name: campaign.title.length > 15 ? `${campaign.title.substring(0, 12)}...` : campaign.title,
      clicks: campaign.clickCount || extractedClicks || 0,
    };
  }).sort((a, b) => b.clicks - a.clicks);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 text-base-content antialiased space-y-6">
      
      <div className="w-full relative flex items-center bg-base-200/40 dark:bg-zinc-900/20 backdrop-blur-md p-3 rounded-2xl border border-base-300 dark:border-zinc-800 shadow-inner">
        <HiOutlineMagnifyingGlass className="absolute left-7 text-base-content/40 h-5 w-5 pointer-events-none" />
        <input
          type="text"
          placeholder="Filter campaigns by tracking title, destination properties, or workspace identifiers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full h-11 pl-12 bg-base-100 dark:bg-zinc-900 border-base-300 dark:border-zinc-800 focus:outline-none focus:border-indigo-500 transition-all text-sm placeholder:opacity-40"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">Active Campaigns</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
              <HiOutlineFolder className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">{totalCampaignsCount}</span>
            <span className="badge badge-success gap-1 text-white text-xs font-semibold py-2 bg-emerald-500 border-none">
              <HiOutlineArrowUpRight className="h-3 w-3" /> Live
            </span>
          </div>
        </div>

        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">Total Grouped Links</span>
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-xl">
              <HiOutlineLink className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">{totalLinksCount}</span>
            <span className="badge badge-success gap-1 text-white text-xs font-semibold py-2 bg-emerald-500 border-none">
              <HiOutlineArrowUpRight className="h-3 w-3" /> Deployed
            </span>
          </div>
        </div>

        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">Cumulative Hits</span>
            <div className="p-2 bg-pink-500/10 text-pink-500 rounded-xl">
              <HiOutlineCursorClick className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">{totalClicksCount}</span>
            <span className="text-xs font-semibold text-base-content/40 dark:text-zinc-500">Global traffic</span>
          </div>
        </div>

        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">Routing Engines</span>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
              <HiOutlineCircleStack className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">Healthy</span>
            <span className="text-xs font-semibold text-base-content/40 dark:text-zinc-500">Systems active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
        <div className="flex flex-col gap-1 mb-6">
          <h3 className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
            <HiOutlineChartBar className="h-5 w-5 text-indigo-500" />
            Campaign Performance Comparison
          </h3>
          <p className="text-xs text-base-content/50 font-medium">Ranked layout distribution showcasing which core tracking campaigns are driving the highest inbound hit metrics.</p>
        </div>

        <div className="w-full h-[280px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(120,120,120,0.15)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(120,120,120,0.05)', radius: 8 }}
                  contentStyle={{ 
                    backgroundColor: "rgba(15, 15, 25, 0.95)", 
                    border: "1px solid rgba(120,120,120,0.2)",
                    borderRadius: "12px",
                    color: "#fff"
                  }} 
                />
                <Bar dataKey="clicks" name="Total Campaign Hits" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-sm text-base-content/40 font-medium border border-dashed border-base-300 dark:border-zinc-800 rounded-xl">
              No active tracking metrics discovered to compare campaign distributions.
            </div>
          )}
        </div>
      </div>

      <div className="w-full pt-4">
        <ListCampaignCard searchFilter={searchQuery} />
      </div>

    </div>
  );
};

export default OverViewPage;