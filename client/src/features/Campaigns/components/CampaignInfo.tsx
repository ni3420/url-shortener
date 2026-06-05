

import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "@/lib/api";
import { 
  HiOutlineLink, 
  HiOutlineCalendar, 
  HiOutlineTag, 
  HiOutlineArrowLeft,
  HiOutlinePlus,
  HiOutlineQueueList,
  HiOutlineArrowTrendingUp,
  HiOutlineCpuChip,
  HiOutlineSparkles
} from "react-icons/hi2";
import CampaignAllLinks from "./CampaignAllLinks";
import AnalyticsCampaign from "@/features/analytics/components/analyticsCampaign";
import CreateLinkModal from "./createModel"; 
import { useGetCampaignById } from "../api/use-getcampaignbyId";

const useGetCampaignLinksCount = (campaignId: string | undefined) => {
  return useQuery({
    queryKey: ["campaign", "links", campaignId],
    queryFn: async () => {
      const { data } = await api.get(`/campaign/${campaignId}/links`);
      return data.data || [];
    },
    enabled: !!campaignId,
    
  });
};

const CampaignInfo = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [activeTab, setActiveTab] = useState<"links" | "analytics">("links");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: detailsResponse, isLoading: isDetailsLoading, error: detailsError } = useGetCampaignById(campaignId as string)

  const { data: linksData, isLoading: isLinksLoading } = useGetCampaignLinksCount(campaignId);

  const campaign = detailsResponse?.data;
  const linksArray = linksData || [];
  const hasNoLinks = linksArray.length === 0;

  if (isDetailsLoading || isLinksLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-base-100 dark:bg-zinc-950">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (detailsError || !campaign) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center bg-base-100 dark:bg-zinc-950">
        <div className="alert alert-error max-w-xl mx-auto rounded-xl shadow-lg text-white">
          <span>Failed to load campaign properties.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen  bg-base-100 dark:bg-zinc-950 text-base-content selection:bg-primary/20 transition-colors duration-300 antialiased">
      
      <div className="border-b border-base-300 dark:border-zinc-900 bg-base-100/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div className="flex flex-col items-center gap-4">
            <Link to="/campaigns" className="btn btn-ghost btn-square h-10 w-10 border border-base-300 dark:border-zinc-800 rounded-xl hover:bg-base-200 dark:hover:bg-zinc-900">
              <HiOutlineArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-md">Workspace Profile</span>
                {campaign.tags && campaign.tags.length > 0 && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-base-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <HiOutlineTag className="h-3 w-3" /> {campaign.tags[0]}
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-base-content dark:text-zinc-100 mt-1">{campaign.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto ">
            <div className="flex bg-base-200 dark:bg-zinc-900/60 p-1 rounded-xl border border-base-300 dark:border-zinc-800 shadow-inner flex-1 md:flex-none">
              <button 
                onClick={() => setActiveTab("links")} 
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all flex-1 md:flex-none whitespace-nowrap ${activeTab === "links" ? "bg-base-100 dark:bg-zinc-800 text-indigo-500 dark:text-indigo-400 shadow-sm border border-base-300/30 dark:border-zinc-700/50" : "text-base-content/60 dark:text-zinc-400 hover:text-base-content dark:hover:text-zinc-100"}`}
              >
                <HiOutlineQueueList className="h-4 w-4 hidden md:flex " /> <span>Tracking Links</span>
              </button>
              <button 
                onClick={() => !hasNoLinks && setActiveTab("analytics")} 
                disabled={hasNoLinks}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all flex-1 md:flex-none whitespace-nowrap ${hasNoLinks ? "opacity-30 cursor-not-allowed" : ""} ${activeTab === "analytics" && !hasNoLinks ? "bg-base-100 dark:bg-zinc-800 text-indigo-500 dark:text-indigo-400 shadow-sm border border-base-300/30 dark:border-zinc-700/50" : "text-base-content/60 dark:text-zinc-400 hover:text-base-content dark:hover:text-zinc-100"}`}
              >
                <HiOutlineArrowTrendingUp className="h-4 w-4 hidden md:flex"  /> <span>Live Analytics</span>
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary btn-sm h-10 bg-gradient-to-r from-indigo-500 to-violet-600 border-none text-white font-bold normal-case rounded-xl shadow-md px-4 gap-2 text-xs flex-1 md:flex-none"
            >
              <HiOutlinePlus className="h-4 w-4" />
              <span>New URL</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-base-200/30 dark:bg-zinc-900/20 border border-base-300 dark:border-zinc-800 rounded-2xl flex flex-col gap-1 min-w-0">
            <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-wider flex items-center gap-1"><HiOutlineLink className="h-3.5 w-3.5" /> Direct Targets Deployed</span>
            <p className="text-xs font-semibold text-base-content/80 dark:text-zinc-300 truncate mt-1">
              {linksArray.length} {linksArray.length === 1 ? "Active Link" : "Active Links"}
            </p>
          </div>
          <div className="p-4 bg-base-200/30 dark:bg-zinc-900/20 border border-base-300 dark:border-zinc-800 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-wider flex items-center gap-1"><HiOutlineCalendar className="h-3.5 w-3.5" /> Deployment Timestamp</span>
            <p className="text-xs font-semibold text-base-content/80 dark:text-zinc-300 mt-1">{new Date(campaign.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="p-4 bg-base-200/30 dark:bg-zinc-900/20 border border-base-300 dark:border-zinc-800 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-wider flex items-center gap-1"><HiOutlineCpuChip className="h-3.5 w-3.5" /> Workspace Signature</span>
            <p className="text-xs font-mono text-base-content/40 dark:text-zinc-500 mt-1 truncate select-all">{campaign._id}</p>
          </div>
        </div>

        <div className="w-full pt-4">
          {hasNoLinks ? (
            <div className="w-full flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-base-300 dark:border-zinc-800 rounded-2xl bg-base-200/10 dark:bg-zinc-900/10">
              <div className="relative flex items-center justify-center w-16 h-16 mb-4">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl animate-pulse" />
                <HiOutlineLink className="h-7 w-7 text-indigo-500" />
              </div>
              <h3 className="text-base font-bold tracking-tight text-base-content dark:text-zinc-200">No routing links active</h3>
              <p className="text-xs text-base-content/50 dark:text-zinc-400 font-medium max-w-sm mt-1 leading-relaxed">
                This tracking campaign profile is currently empty. Generate your first short redirection URL layout node using pre-compiled analytics parameters.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-sm h-10 mt-5 bg-base-200 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 hover:border-indigo-500/30 hover:bg-indigo-500/5 rounded-xl font-bold text-xs normal-case gap-2 px-4 transition-all"
              >
                <HiOutlineSparkles className="text-indigo-500 h-4 w-4" />
                <span>Generate First Tracking Link</span>
              </button>
            </div>
          ) : (
            <div className="animate-in fade-in duration-200">
              {activeTab === "links" ? <CampaignAllLinks /> : <AnalyticsCampaign />}
            </div>
          )}
        </div>
      </div>

      <CreateLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaignId={campaignId!}
        campaignTitle={campaign.title}
      />
    </div>
  );
};

export default CampaignInfo;