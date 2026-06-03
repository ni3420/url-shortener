import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { 
  HiOutlineFolder, 
  HiOutlineLink, 
  HiOutlineCalendar, 
  HiOutlineTag, 
  HiOutlineArrowLeft,
  HiOutlineChartBar
} from "react-icons/hi2";

interface CampaignDetails {
  _id: string;
  title: string;
  originalUrl: string;
  tag?: string;
  createdAt: string;
  description?: string;
}

const CampaignInfo = () => {
  const { campaignId } = useParams<{ campaignId: string }>();

  const { data: response, isLoading, error } = useQuery({
    queryKey: ["campaign", "details", campaignId],
    queryFn: async () => {
      const res = await api.get(`/campaign/${campaignId}`);
      return res.data;
    },
    enabled: !!campaignId,
  });

  const campaign: CampaignDetails | undefined = response?.data;

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="alert alert-error max-w-xl mx-auto rounded-xl shadow-lg text-white">
          <span>Failed to load campaign properties. This metadata node might have been removed.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 text-base-content antialiased">
      <div className="mb-6">
        <Link
          to="/dashboard/campaigns"
          className="btn btn-ghost btn-sm gap-2 pl-1 h-9 min-h-[2.25rem] text-base-content/60 hover:text-base-content hover:bg-base-200 dark:hover:bg-zinc-900 rounded-xl font-medium text-xs normal-case transition-all"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          <span>Back to Campaigns</span>
        </Link>
      </div>

      <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl shadow-xl shadow-base-content/5 overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-200 dark:border-zinc-800 pb-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500/10 to-violet-600/10 border border-indigo-500/20 text-indigo-500 shadow-sm">
                <HiOutlineFolder className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary opacity-80">Campaign Profile</span>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-base-content dark:text-zinc-100 mt-0.5">
                  {campaign.title}
                </h1>
              </div>
            </div>

            <Link
              to={`/dashboard/campaign/${campaign._id}`}
              className="btn btn-primary sm:btn-sm h-10 sm:h-9 px-4 bg-gradient-to-r from-indigo-500 to-violet-600 border-none text-white font-semibold normal-case rounded-xl shadow-md gap-2 self-stretch sm:self-auto text-xs"
            >
              <HiOutlineChartBar className="h-4 w-4" />
              <span>View Analytics</span>
            </Link>
          </div>

          <div className="space-y-4">
            
            <div className="flex flex-col gap-1.5 p-4 bg-base-200/40 dark:bg-zinc-950/30 rounded-xl border border-base-300/60 dark:border-zinc-800/60">
              <span className="text-xs font-semibold text-base-content/50 dark:text-zinc-400 flex items-center gap-1.5">
                <HiOutlineLink className="h-4 w-4" /> Destination Target URL
              </span>
              <p className="text-sm font-medium text-base-content dark:text-zinc-200 break-all select-all">
                {campaign.originalUrl}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="flex items-center gap-3.5 p-4 bg-base-200/40 dark:bg-zinc-950/30 rounded-xl border border-base-300/60 dark:border-zinc-800/60">
                <div className="p-2 bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-lg text-base-content/60">
                  <HiOutlineCalendar className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-base-content/40 dark:text-zinc-500 uppercase tracking-wider">Date Launched</span>
                  <span className="text-sm font-bold text-base-content/80 dark:text-zinc-300">
                    {new Date(campaign.createdAt).toLocaleDateString("en-US", { 
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 bg-base-200/40 dark:bg-zinc-955/30 rounded-xl border border-base-300/60 dark:border-zinc-800/60">
                <div className="p-2 bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-lg text-base-content/60">
                  <HiOutlineTag className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-base-content/40 dark:text-zinc-500 uppercase tracking-wider">Assigned Segment</span>
                  <span className={`text-sm font-bold ${campaign.tag ? "text-indigo-500 dark:text-indigo-400" : "text-base-content/30 italic"}`}>
                    {campaign.tag || "Unclassified"}
                  </span>
                </div>
              </div>

            </div>

            {campaign.description && (
              <div className="flex flex-col gap-1.5 p-4 bg-base-200/40 dark:bg-zinc-950/30 rounded-xl border border-base-300/60 dark:border-zinc-800/60">
                <span className="text-xs font-semibold text-base-content/50 dark:text-zinc-400">Contextual Summary</span>
                <p className="text-sm text-base-content/70 dark:text-zinc-300 leading-relaxed">
                  {campaign.description}
                </p>
              </div>
            )}

          </div>


          <div className="pt-4 border-t border-base-200 dark:border-zinc-800/80 text-center">
            <p className="text-[11px] text-base-content/30 dark:text-zinc-600 font-medium">
              System Identifier Schema: {campaign._id}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CampaignInfo;