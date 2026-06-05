"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { useGetAllCampaigns } from "@/features/Campaigns/api/use-getAllCampaign";
import { toast } from "sonner";
import { 
  HiOutlineFolder, 
  HiOutlineCalendar, 
  HiOutlineTag, 
  HiOutlineTrash, 
  HiOutlineArrowLongRight
} from "react-icons/hi2";

interface CampaignItem {
  _id: string;
  title: string;
  originalUrl: string;
  tag?: string;
  createdAt: string;
}

interface ListCampaignCardProps {
  searchFilter: string;
}

const ListCampaignCard = ({ searchFilter }: ListCampaignCardProps) => {
  const queryClient = useQueryClient();
  const { data: response, isLoading, error } = useGetAllCampaigns();
  
  const campaigns: CampaignItem[] = response?.data || [];

  const deleteCampaignMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/campaign/${id}`);
    },
    onSuccess: () => {
      toast.success("Campaign deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
    onError: () => {
      toast.error("Failed to delete campaign resource");
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-xl mx-auto rounded-xl shadow-lg text-white">
        <span>Failed to fetch campaigns. Verify service layer health parameters.</span>
      </div>
    );
  }

  const filteredCampaigns = campaigns.filter((campaign) => {
    return (
      campaign.title?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      campaign.originalUrl?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (campaign.tag && campaign.tag?.toLowerCase().includes(searchFilter.toLowerCase()))
    );
  });

  return (
    <div className="w-full mx-auto space-y-6 text-base-content antialiased">
      {filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCampaigns.map((campaign) => (
            <div 
              key={campaign._id}
              className="group bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-5 shadow-xl shadow-base-content/5 flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/40 hover:shadow-indigo-500/5 relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 shadow-sm">
                    <HiOutlineFolder className="h-5 w-5" />
                  </div>
                  
                  <button
                    onClick={() => deleteCampaignMutation.mutate(campaign._id)}
                    disabled={deleteCampaignMutation.isPending}
                    className="btn btn-circle btn-xs border border-base-300 dark:border-zinc-800 bg-base-100 dark:bg-zinc-950 text-base-content/40 hover:text-error hover:bg-error/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                  >
                    <HiOutlineTrash className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-base-content dark:text-zinc-100 tracking-tight line-clamp-1">
                    {campaign.title}
                  </h3>
                  <p className="text-xs text-base-content/40 dark:text-zinc-500 font-medium line-clamp-2 select-all break-all">
                    {campaign.originalUrl}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 mt-5 border-t border-base-200 dark:border-zinc-800/80 gap-2">
                <div className="flex items-center gap-4 text-[11px] font-semibold text-base-content/50 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <HiOutlineCalendar className="h-4 w-4 opacity-70" />
                    {new Date(campaign.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>

                  {campaign.tag && (
                    <span className="flex items-center gap-1 badge badge-sm bg-base-200 dark:bg-zinc-800 border-none rounded-md px-2 py-2 text-[10px]">
                      <HiOutlineTag className="h-3 w-3 opacity-70" />
                      {campaign.tag}
                    </span>
                  )}
                </div>

                <Link
                  to={`/dashboard/campaign/${campaign._id}`}
                  className="btn btn-ghost btn-xs h-8 min-h-[2rem] px-3 font-semibold normal-case rounded-lg text-indigo-500 hover:bg-indigo-500/10 gap-1.5 transition-all"
                >
                  <span>Dashboard</span>
                  <HiOutlineArrowLongRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center text-center p-12 border border-dashed border-base-300 dark:border-zinc-800 rounded-2xl bg-base-100 dark:bg-zinc-900/40">
          <HiOutlineFolder className="h-12 w-12 text-base-content/20 mb-3" />
          <h3 className="text-sm font-bold tracking-tight">No tracking campaigns discovered</h3>
          <p className="text-xs text-base-content/40 font-medium max-w-xs mt-0.5">
            Modify your search criteria or initiate deployment workflows to create structural monitoring instances.
          </p>
        </div>
      )}
    </div>
  );
};

export default ListCampaignCard;