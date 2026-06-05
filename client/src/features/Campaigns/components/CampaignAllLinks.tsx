"use client";

import { useParams } from "react-router-dom";
import { useGetCampaignById } from "@/features/Campaigns/api/use-getcampaignbyId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { 
  HiOutlineLink, 
  HiOutlineShare, 
  HiOutlineTrash, 
  HiOutlineSquare2Stack,
  HiOutlineCalendar,
  HiOutlineEye,
} from "react-icons/hi2";
import { HiOutlineCursorClick } from "react-icons/hi";

interface LinkItem {
  _id: string;
  title: string;
  shortId: string;
  originalUrl: string;
  clickCount: number;
  createdAt: string;
}

const LinkList = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const queryClient = useQueryClient();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: response, isLoading, error } = useGetCampaignById(campaignId as string);
  
  const campaignLinks: LinkItem[] = response?.data?.links || [];
  const campaignTitle = response?.title || "Campaign Links";

  const deleteLinkMutation = useMutation({
    mutationFn: async (linkId: string) => {
      await api.delete(`/url`, { data: { linkId } });
    },
    onSuccess: () => {
      toast.success("Shortened tracking link removed");
      
      // Forces background updates across any query key tracking active campaigns
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign", campaignId] });
    },
    onError: () => {
      toast.error("Failed to delete link resource");
    }
  });

  const handleCopy = async (id: string, text: string) => {
    try {
      const baseUrl = window.location.origin;
      await navigator.clipboard.writeText(`${baseUrl}/api/url/${text}/campaign`);
      setCopiedId(id);
      toast.success("Short link copied!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-base-200/20 dark:bg-zinc-900/10 border border-base-300 dark:border-zinc-800 rounded-2xl animate-pulse">
        <div className="space-y-3 w-full px-6">
          <div className="h-5 w-1/3 bg-base-300 dark:bg-zinc-800 rounded-lg" />
          <div className="h-20 w-full bg-base-300 dark:bg-zinc-800 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error rounded-xl text-white shadow-md max-w-xl mx-auto my-4">
        <span>Error linking data pipeline stream. Refresh browser state context.</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-2 space-y-4 text-base-content antialiased">
      <div className="flex items-center justify-between border-b border-base-200 dark:border-zinc-800 pb-3">
        <div>
          <h3 className="text-lg font-bold tracking-tight">{campaignTitle}</h3>
          <p className="text-xs text-base-content/50 font-medium">Grouped tracking nodes deployed inside this profile scope.</p>
        </div>
        <div className="badge badge-sm font-bold bg-base-200 dark:bg-zinc-800 border-none rounded-lg p-3">
          {campaignLinks.length} Links total
        </div>
      </div>

      {campaignLinks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaignLinks.map((link) => (
            <div
              key={link._id}
              className="group bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-5 shadow-xl shadow-base-content/5 flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/30"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col min-w-0 gap-1">
                    <h4 className="font-bold text-base text-base-content dark:text-zinc-100 tracking-tight truncate">
                      {link.title || "Untitled Pointer Routing"}
                    </h4>
                    <span className="text-xs text-base-content/40 dark:text-zinc-500 font-medium flex items-center gap-1">
                      <HiOutlineCalendar className="h-3.5 w-3.5" />
                      {new Date(link.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteLinkMutation.mutate(link.shortId)}
                    disabled={deleteLinkMutation.isPending}
                    className="btn btn-circle btn-xs border border-base-300 dark:border-zinc-800 bg-base-100 dark:bg-zinc-950 text-base-content/40 hover:text-error hover:bg-error/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0"
                  >
                    <HiOutlineTrash className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="p-3 bg-base-200/50 dark:bg-zinc-950/40 rounded-xl border border-base-300/40 dark:border-zinc-800/40 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 select-all truncate font-mono">
                      {window.location.origin}/api/url/{link.shortId}/campaign
                    </span>
                    <div className="flex items-center gap-1">
                      <a 
                        href={`${window.location.origin}/api/url/${link.shortId}/campaign`}
                        target="result" 
                        rel="noreferrer" 
                        className="btn btn-ghost btn-xs h-7 w-7 p-0 rounded-lg text-base-content/50 hover:text-primary hover:bg-base-300 dark:hover:bg-zinc-800"
                      >
                        <HiOutlineEye className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleCopy(link._id, link.shortId)}
                        className={`btn btn-ghost btn-xs h-7 w-7 p-0 rounded-lg text-base-content/50 hover:text-indigo-500 hover:bg-base-300 dark:hover:bg-zinc-800 transition-all ${
                          copiedId === link._id ? "text-emerald-500 hover:text-emerald-500 bg-emerald-500/10" : ""
                        }`}
                      >
                        {copiedId === link._id ? <HiOutlineSquare2Stack className="h-4 w-4" /> : <HiOutlineShare className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-base-300/40 dark:border-zinc-800/40 pt-2">
                    <p className="text-xs text-base-content/50 dark:text-zinc-500 font-medium line-clamp-1 break-all select-all">
                      {link.originalUrl}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-base-200 dark:border-zinc-800/60">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-base-content/60 dark:text-zinc-400">
                  <HiOutlineCursorClick className="h-4 w-4 text-indigo-500" />
                  <span>Redirect Volatilities</span>
                </div>
                
                <div className="flex items-baseline gap-1 bg-base-200/60 dark:bg-zinc-950/40 px-3 py-1 rounded-lg border border-base-300/30 dark:border-zinc-800/30">
                  <span className="text-sm font-black tracking-tight text-base-content dark:text-zinc-100">
                    {link.clickCount || 0}
                  </span>
                  <span className="text-[10px] font-bold text-base-content/40 dark:text-zinc-500 uppercase tracking-wide">
                    Hits
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center text-center p-12 border border-dashed border-base-300 dark:border-zinc-800 rounded-2xl bg-base-100 dark:bg-zinc-900/40">
          <HiOutlineLink className="h-12 w-12 text-base-content/20 mb-3" />
          <h3 className="text-sm font-bold tracking-tight">No tracking shortcuts found</h3>
          <p className="text-xs text-base-content/40 font-medium max-w-xs mt-0.5">
            Deploy your destination long URLs using standard tracking configuration pipelines to populate this index.
          </p>
        </div>
      )}
    </div>
  );
};

export default LinkList;