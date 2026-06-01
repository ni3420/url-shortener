import { useState } from "react";
import { useGetAllLinks } from "@/features/dashboard/api/use-getALlLinks";
import { ExternalLink, Copy, Check, Calendar, BarChart2, ArrowLeft } from "lucide-react";

interface LinkItem {
  _id: string;
  original_Url: string;
  short_Url: string;
  TotalClicks: string[];
  isActive?: boolean;
  createdAt?: string;
}

interface LinkListProps {
  search: string;
  status: string;
  sort: string;
}

const LinkList = ({ search, status, sort }: LinkListProps) => {
  const { data: links, isLoading } = useGetAllLinks();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12 w-full">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const linksArray: LinkItem[] = Array.isArray(links) ? links : [];

  const processedLinks = linksArray
    .filter((link) => {
      const shortUrl = link.short_Url || "";
      const originalUrl = link.original_Url || "";

      const matchesSearch =
        shortUrl.toLowerCase().includes(search.toLowerCase()) ||
        originalUrl.toLowerCase().includes(search.toLowerCase());

      const activeStatus = link.isActive ?? true;
      const matchesStatus =
        status === "all" ||
        (status === "active" && activeStatus) ||
        (status === "expired" && !activeStatus);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sort === "clicks") {
        const clicksA = a.TotalClicks?.length || 0;
        const clicksB = b.TotalClicks?.length || 0;
        return clicksB - clicksA;
      }

      if (sort === "latest") {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }

      if (sort === "oldest") {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      }

      return 0;
    });

  const handleCopy = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (processedLinks.length === 0) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="self-start">
          <button onClick={() => window.history.back()} className="btn btn-ghost btn-sm gap-2 pl-2">
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
        <div className="text-center p-12 border-2 border-dashed border-base-300 rounded-2xl text-base-content/60 bg-base-50">
          <p className="text-lg font-medium">No links found matching your criteria.</p>
          <p className="text-sm text-base-content/40 mt-1">Try adjusting your filters or search term.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="self-start">
        
      </div>

      {processedLinks.map((link) => {
        const activeStatus = link.isActive ?? true;
        const totalClicksCount = link.TotalClicks?.length || 0;
        const fullShortUrl = `${window.location.origin}/api/${link.short_Url}`;
        const formattedDate = link.createdAt 
          ? new Date(link.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
          : "Unknown date";

        return (
          <div
            key={link._id}
            className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-base-100 border border-base-200 rounded-2xl shadow-sm hover:shadow-md hover:border-base-300 transition-all gap-4"
          >
            <div className="flex flex-col gap-2 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg text-primary hover:underline break-all">
                  {window.location.host}/api/{link.short_Url}
                </span>
                
                <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopy(fullShortUrl, link._id)}
                    className={`btn btn-ghost btn-xs btn-square ${copiedId === link._id ? 'text-success' : 'text-base-content/60 hover:text-secondary'}`}
                    title="Copy Link"
                  >
                    {copiedId === link._id ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                  
                  <a
                    href={fullShortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost btn-xs btn-square text-base-content/60 hover:text-secondary"
                    title="Open Link"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>

              <p className="text-sm text-base-content/70 truncate max-w-xl" title={link.original_Url}>
                {link.original_Url}
              </p>

              <div className="flex items-center gap-4 text-xs text-base-content/40 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formattedDate}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-3 md:pt-0 border-t border-base-100 md:border-t-0">
              <div className="flex items-center gap-1.5 bg-base-200/60 px-3 py-1.5 rounded-lg text-sm font-semibold text-base-content/80">
                <BarChart2 size={16} className="text-secondary" />
                <span>
                  {totalClicksCount} <span className="text-xs font-normal text-base-content/50">{totalClicksCount === 1 ? "click" : "clicks"}</span>
                </span>
              </div>

              <span
                className={`badge badge-md font-medium px-3 py-3 rounded-md ${
                  activeStatus 
                    ? "bg-success/10 text-success border-success/20 gap-1.5" 
                    : "bg-base-200 text-base-content/50 border-base-300"
                }`}
              >
                {activeStatus && <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />}
                {activeStatus ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LinkList;