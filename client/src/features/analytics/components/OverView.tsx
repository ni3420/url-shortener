import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  HiOutlineSquares2X2, 
  HiOutlineLink, 
  HiOutlineSparkles,
  HiOutlineArrowUpRight,
  HiOutlinePlus,
  HiOutlineCircleStack,
  HiOutlineShare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { HiOutlineCursorClick } from "react-icons/hi";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { useGetCampaignOverview, useGetCampaignTimeline } from "@/features/analytics";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import ListCampaignCard from "@/features/Campaigns/components/ListAllCampaign";

interface LinkItem {
  _id: string;
  title: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
}

const OverViewPage = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const queryClient = useQueryClient();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: overview, isLoading: isOverviewLoading, error: overviewError } = useGetCampaignOverview(campaignId);
  const { data: timeline, isLoading: isTimelineLoading, error: timelineError } = useGetCampaignTimeline(campaignId);

  const { data: campaignLinks, isLoading: isLinksLoading, error: linksError } = useQuery<LinkItem[]>({
    queryKey: ["campaign", "links", campaignId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/campaign/${campaignId}/links`);
      return data.data;
    },
    enabled: !!campaignId,
  });

  const deleteLinkMutation = useMutation({
    mutationFn: async (linkId: string) => {
      await axios.delete(`/api/links/${linkId}`);
    },
    onSuccess: () => {
      toast.success("Short link deleted permanently");
      queryClient.invalidateQueries({ queryKey: ["campaign", "links", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["campaign", "overview", campaignId] });
    },
    onError: () => {
      toast.error("Failed to delete link resource");
    }
  });

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy text");
    }
  };

  if (isOverviewLoading || isTimelineLoading || isLinksLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (overviewError || timelineError || linksError) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="alert alert-error max-w-xl mx-auto rounded-xl shadow-lg text-white">
          <span>Failed to sync operational dashboard components. Verify server connectivity layers.</span>
        </div>
      </div>
    );
  }

  const chartData = timeline?.map(item => {
    const rawDate = item._id ? new Date(item._id) : new Date();
    const formattedDate = !isNaN(rawDate.getTime()) 
      ? rawDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : item._id;

    return {
      name: formattedDate,
      clicks: item.clicks || 0
    };
  }) || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 text-base-content antialiased">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-base-300 dark:border-zinc-900 pb-6 mt-6 md:mt-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-violet-600/10 border border-indigo-500/20 text-indigo-500 shadow-sm">
              <HiOutlineSquares2X2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
                Performance Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-base-content/50 font-medium mt-0.5">
                Overview metrics, structural link performance diagnostics, and quick shortcuts.
              </p>
            </div>
          </div>
        </div>

        <div className="self-stretch sm:self-auto flex">
          <Link 
            to={`/dashboard/campaign/${campaignId}/create-link`}
            className="btn btn-primary w-full sm:w-auto h-11 min-h-[2.75rem] px-5 bg-gradient-to-r from-indigo-500 to-violet-600 border-none text-white font-medium normal-case rounded-xl shadow-lg shadow-indigo-500/10 hover:from-indigo-600 hover:to-violet-700 active:scale-[0.98] transition-all gap-2"
          >
            <HiOutlinePlus className="h-4 w-4" />
            <span>Create New Link</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">Total Links Created</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl"><HiOutlineLink className="h-5 w-5" /></div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">{overview?.totalLinks ?? 0}</span>
            <span className="badge badge-success gap-1 text-white text-xs font-semibold py-2 bg-emerald-500 border-none">
              <HiOutlineArrowUpRight className="h-3 w-3" /> Live
            </span>
          </div>
        </div>

        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">Total Clicks Redirected</span>
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-xl"><HiOutlineCursorClick className="h-5 w-5" /></div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">{overview?.totalClicks ?? 0}</span>
            <span className="badge badge-success gap-1 text-white text-xs font-semibold py-2 bg-emerald-500 border-none">
              <HiOutlineArrowUpRight className="h-3 w-3" /> Sync
            </span>
          </div>
        </div>

        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">QR Codes Generated</span>
            <div className="p-2 bg-pink-500/10 text-pink-500 rounded-xl"><HiOutlineCircleStack className="h-5 w-5" /></div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">{overview?.totalLinks ?? 0}</span>
            <span className="text-xs font-semibold text-base-content/40 dark:text-zinc-500">1:1 mapping</span>
          </div>
        </div>


        <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-base-content/60 dark:text-zinc-400">Custom Aliases</span>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl"><HiOutlineSparkles className="h-5 w-5" /></div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">Active</span>
            <span className="text-xs font-semibold text-base-content/40 dark:text-zinc-500">Routing ready</span>
          </div>
        </div>
      </div>
          <ListCampaignCard/>


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        <div className="lg:col-span-7 bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl shadow-base-content/5 flex flex-col justify-between">
          <div className="flex flex-col gap-1 mb-6">
            <h3 className="text-base sm:text-lg font-bold tracking-tight">Timeline Engagement Analytics</h3>
            <p className="text-xs text-base-content/50 font-medium">Visualizing total dynamic link redirect actions mapped chronologically over active days.</p>
          </div>

          <div className="w-full h-[320px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(120,120,120,0.15)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(120,120,120,0.05)', radius: 8 }}
                    contentStyle={{ 
                      backgroundColor: "rgba(30, 30, 40, 0.9)", 
                      border: "1px solid rgba(120,120,120,0.2)",
                      borderRadius: "12px",
                      color: "#fff"
                    }} 
                  />
                  <Bar dataKey="clicks" name="Total Redirects" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-sm text-base-content/40 font-medium border border-dashed border-base-300 dark:border-zinc-800 rounded-xl">
                No activity tracking logs discovered for the current window pipeline scope.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl shadow-base-content/5 flex flex-col">
          <div className="flex flex-col gap-1 mb-4">
            <h3 className="text-base sm:text-lg font-bold tracking-tight">Campaign Links Deployment</h3>
            <p className="text-xs text-base-content/50 dark:text-zinc-400 font-medium">Manage active shortened assets and track click weights directly.</p>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[320px] pr-1 flex-1">
            {campaignLinks && campaignLinks.length > 0 ? (
              campaignLinks.map((link) => (
                <div 
                  key={link._id} 
                  className="p-3.5 bg-base-200/50 dark:bg-zinc-950/40 border border-base-300 dark:border-zinc-800/60 rounded-xl flex items-center justify-between gap-4 transition-all hover:border-indigo-500/30"
                >
                  <div className="flex flex-col min-w-0 gap-0.5">
                    <span className="text-sm font-bold truncate text-base-content dark:text-zinc-200">{link.title || "Untitled Short Link"}</span>
                    <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 select-all truncate">{link.shortUrl}</span>
                    <span className="text-[11px] text-base-content/40 dark:text-zinc-500 font-medium truncate max-w-[180px] sm:max-w-[220px]">{link.originalUrl}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex flex-col items-end mr-1">
                      <span className="text-xs font-black text-base-content dark:text-zinc-200">{link.clicks || 0}</span>
                      <span className="text-[10px] font-semibold opacity-40">clicks</span>
                    </div>
                    <button 
                      onClick={() => handleCopy(link._id, link.shortUrl)}
                      className={`btn btn-circle btn-xs bg-base-100 dark:bg-zinc-900 text-base-content/70 hover:text-indigo-500 border border-base-300 dark:border-zinc-800 ${copiedId === link._id ? "text-emerald-500 border-emerald-500/30 bg-emerald-500/5" : ""}`}
                    >
                      <HiOutlineShare className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => deleteLinkMutation.mutate(link._id)}
                      disabled={deleteLinkMutation.isPending}
                      className="btn btn-circle btn-xs bg-base-100 dark:bg-zinc-900 text-error hover:bg-error/10 border border-base-300 dark:border-zinc-800"
                    >
                      <HiOutlineTrash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-base-300 dark:border-zinc-800 rounded-xl">
                <p className="text-xs text-base-content/40 font-medium">No target links grouped under this campaign infrastructure node.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;