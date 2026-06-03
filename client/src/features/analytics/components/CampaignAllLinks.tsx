import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { 
  HiOutlineLink, 
  HiOutlineShare, 
  HiOutlineTrash, 
  HiOutlineMagnifyingGlass,
  HiOutlineSquare2Stack,
  HiOutlineCalendar,
} from "react-icons/hi2";
import { HiOutlineCursorClick } from "react-icons/hi";
interface LinkItem {
  _id: string;
  title: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
}

const CampaignLinkList = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: response, isLoading, error } = useQuery({
    queryKey: ["campaign", "links", campaignId],
    queryFn: async () => {
      const res = await api.get(`/campaign/${campaignId}/links`);
      return res.data;
    },
    enabled: !!campaignId,
  });

  const campaignLinks: LinkItem[] = response?.data || [];

  const deleteLinkMutation = useMutation({
    mutationFn: async (linkId: string) => {
      await api.delete(`/links/${linkId}`);
    },
    onSuccess: () => {
      toast.success("Shortened link deleted permanently");
      queryClient.invalidateQueries({ queryKey: ["campaign", "links", campaignId] });
    },
    onError: () => {
      toast.error("Failed to delete link resource");
    }
  });

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy link text");
    }
  };

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
        <span>Failed to sync database link records. Verify server configuration states.</span>
      </div>
    );
  }

  const filteredLinks = campaignLinks.filter((link) =>
    link.title?.toLowerCase().includes(search.toLowerCase()) ||
    link.shortUrl?.toLowerCase().includes(search.toLowerCase()) ||
    link.originalUrl?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6 text-base-content antialiased">
      
      <div className="w-full relative flex items-center bg-base-200/40 backdrop-blur-md p-3 rounded-2xl border border-base-300 dark:border-zinc-800 shadow-sm">
        <HiOutlineMagnifyingGlass className="absolute left-7 text-base-content/40 h-5 w-5 pointer-events-none" />
        <input
          type="text"
          placeholder="Search grouped items by title, alias, or target configuration mapping..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full h-11 pl-12 bg-base-100 dark:bg-zinc-900 border-base-300 dark:border-zinc-800 focus:outline-none focus:border-indigo-500 transition-all text-sm placeholder:opacity-40"
        />
      </div>

      {filteredLinks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLinks.map((link) => (
            <div
              key={link._id}
              className="group bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl p-5 shadow-xl shadow-base-content/5 flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/30"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col min-w-0 gap-1">
                    <h4 className="font-bold text-base text-base-content dark:text-zinc-100 tracking-tight truncate">
                      {link.title || "Untitled Tracking Pointer"}
                    </h4>
                    <span className="text-xs text-base-content/40 dark:text-zinc-500 font-medium flex items-center gap-1">
                      <HiOutlineCalendar className="h-3.5 w-3.5" />
                      Deployed {new Date(link.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteLinkMutation.mutate(link._id)}
                    disabled={deleteLinkMutation.isPending}
                    className="btn btn-circle btn-xs border border-base-300 dark:border-zinc-800 bg-base-100 dark:bg-zinc-950 text-base-content/40 hover:text-error hover:bg-error/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0"
                  >
                    <HiOutlineTrash className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="p-3 bg-base-200/50 dark:bg-zinc-950/40 rounded-xl border border-base-300/40 dark:border-zinc-800/40 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-indigo-500 dark:text-indigo-400 select-all truncate">
                      {link.shortUrl}
                    </span>
                    <button
                      onClick={() => handleCopy(link._id, link.shortUrl)}
                      className={`btn btn-ghost btn-xs h-7 w-7 p-0 rounded-lg text-base-content/50 hover:text-indigo-500 hover:bg-base-300 dark:hover:bg-zinc-800 transition-all ${
                        copiedId === link._id ? "text-emerald-500 hover:text-emerald-500 bg-emerald-500/10" : ""
                      }`}
                    >
                      {copiedId === link._id ? <HiOutlineSquare2Stack className="h-4 w-4 animate-scale" /> : <HiOutlineShare className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  <div className="border-t border-base-300/40 dark:border-zinc-800/40 pt-2">
                    <p className="text-xs text-base-content/50 dark:text-zinc-500 font-medium line-clamp-1 break-all">
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
                    {link.clicks || 0}
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
          <h3 className="text-sm font-bold tracking-tight">No grouped links discovered</h3>
          <p className="text-xs text-base-content/40 font-medium max-w-xs mt-0.5">
            Modify your tracking keywords or deploy a clean destination short mapping instance.
          </p>
        </div>
      )}
    </div>
  );
};

export default CampaignLinkList;