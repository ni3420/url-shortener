"use client";

import { useState } from "react";
import { useGetAllLinks } from "@/features/dashboard/api/use-getALlLinks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar, 
  BarChart2, 
  ArrowLeft, 
  QrCode,
  Trash2 
} from "lucide-react";
import { conf } from "@/conf/conf";

interface LinkItem {
  _id: string;
  title?: string;
  originalUrl: string;
  shortId: string;
  qrCodeUrl?: string;
  clickCount?: number;
  isActive?: boolean;
  createdAt?: string;
}

interface ApiResponse {
  success: boolean;
  data: LinkItem[];
}

interface LinkListProps {
  search: string;
  status: string;
  sort: string;
}

const LinkList = ({ search, status, sort }: LinkListProps) => {
  const queryClient = useQueryClient();
  const { data: response, isLoading } = useGetAllLinks();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQrId, setActiveQrId] = useState<string | null>(null);

  const deleteLinkMutation = useMutation({
    mutationFn: async (linkId: string) => {
      await api.delete("/url", { data:  {linkId } });
    },
    onSuccess: () => {
      toast.success("Shortened tracking link removed");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: () => {
      toast.error("Failed to delete link resource");
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12 w-full">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const linksArray: LinkItem[] = (response as ApiResponse)?.data || (Array.isArray(response) ? response : []);

  const processedLinks = linksArray
    .filter((link) => {
      const shortUrl = link.shortId || "";
      const originalUrl = link.originalUrl || "";
      const title = link.title || "";

      const matchesSearch =
        shortUrl.toLowerCase().includes(search.toLowerCase()) ||
        originalUrl.toLowerCase().includes(search.toLowerCase()) ||
        title.toLowerCase().includes(search.toLowerCase());

      const activeStatus = link.isActive ?? true;
      const matchesStatus =
        status === "all" ||
        (status === "active" && activeStatus) ||
        (status === "expired" && !activeStatus);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sort === "clicks") {
        const clicksA = a.clickCount || 0;
        const clicksB = b.clickCount || 0;
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

  const toggleQrCode = (id: string) => {
    setActiveQrId((prev) => (prev === id ? null : id));
  };

  if (processedLinks.length === 0) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="self-start">
          <button onClick={() => window.history.back()} className="btn btn-ghost btn-sm gap-2 pl-2 normal-case text-base-content/70">
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
        <div className="text-center p-12 border border-dashed border-base-300 dark:border-zinc-800 rounded-2xl text-base-content/60 bg-base-100 dark:bg-zinc-900/40">
          <p className="text-base font-bold tracking-tight">No routing instances discovered</p>
          <p className="text-xs text-base-content/40 font-medium mt-0.5">Try modifying your query constraints or filtering parameters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {processedLinks.map((link) => {
        const activeStatus = link.isActive ?? true;
        const clickCountCount = link.clickCount || 0;
        const fullShortUrl = `${conf.BaseUrl}/url/${link.shortId}`;
        const formattedDate = link.createdAt 
          ? new Date(link.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
          : "Unknown date";
        const isQrOpen = activeQrId === link._id;

        return (
          <div
            key={link._id}
            className="group flex flex-col p-5 bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl shadow-xl shadow-base-content/5 transition-all duration-300 hover:border-indigo-500/30 gap-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                {link.title && (
                  <h4 className="font-bold text-base text-base-content dark:text-zinc-100 tracking-tight truncate mb-0.5">
                    {link.title}
                  </h4>
                )}
                
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-lg text-indigo-500 dark:text-indigo-400 break-all select-all">
                    {conf.BaseUrl}/url/{link.shortId}
                  </span>
                  
                  <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopy(fullShortUrl, link.shortId)}
                      className={`btn btn-ghost btn-xs btn-square h-7 w-7 rounded-lg ${copiedId === link.shortId ? 'text-emerald-500 bg-emerald-500/10' : 'text-base-content/50 hover:text-indigo-500'}`}
                      title="Copy Link"
                    >
                      {copiedId === link.shortId ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                    
                    <a
                      href={fullShortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost btn-xs btn-square h-7 w-7 rounded-lg text-base-content/50 hover:text-indigo-500"
                      title="Open Link"
                    >
                      <ExternalLink size={14} />
                    </a>

                    {link.qrCodeUrl && (
                      <button
                        onClick={() => toggleQrCode(link._id)}
                        className={`btn btn-ghost btn-xs btn-square h-7 w-7 rounded-lg ${isQrOpen ? 'text-pink-500 bg-pink-500/10 border border-pink-500/20' : 'text-base-content/50 hover:text-pink-500'}`}
                        title="Toggle QR Code Engine"
                      >
                        <QrCode size={14} />
                      </button>
                    )}

                    <button
                      onClick={() => deleteLinkMutation.mutate(link.shortId)}
                      disabled={deleteLinkMutation.isPending}
                      className="btn btn-ghost btn-xs btn-square h-7 w-7 rounded-lg text-base-content/40 hover:text-error hover:bg-error/10 transition-colors"
                      title="Delete Link"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-xs font-medium text-base-content/50 dark:text-zinc-500 truncate max-w-xl select-all mt-1" title={link.originalUrl}>
                  {link.originalUrl}
                </p>

                <div className="flex items-center gap-4 text-[11px] font-semibold text-base-content/40 dark:text-zinc-500 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    {formattedDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-3 md:pt-0 border-t border-base-200 dark:border-zinc-800/60 md:border-t-0">
                <div className="flex items-center gap-1 bg-base-200/60 dark:bg-zinc-950/40 px-3 py-1.5 rounded-lg border border-base-300/30 dark:border-zinc-800/30">
                  <BarChart2 size={15} className="text-indigo-500" />
                  <span className="text-sm font-black text-base-content dark:text-zinc-100">
                    {clickCountCount} <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-wider">{clickCountCount === 1 ? "hit" : "hits"}</span>
                  </span>
                </div>

                <span
                  className={`badge badge-md font-bold px-3 py-3 rounded-md border ${
                    activeStatus 
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1.5" 
                      : "bg-base-200 dark:bg-zinc-800 text-base-content/40 border-base-300 dark:border-zinc-700"
                  }`}
                >
                  {activeStatus && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                  {activeStatus ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {isQrOpen && link.qrCodeUrl && (
              <div className="w-full border-t border-dashed border-base-300 dark:border-zinc-800 pt-4 mt-1 flex flex-col sm:flex-row items-center gap-4 bg-base-200/30 dark:bg-zinc-950/20 p-4 rounded-xl animate-fade-in">
                <div className="p-2 bg-white rounded-xl shadow-md border border-zinc-200 shrink-0">
                  <img 
                    src={link.qrCodeUrl} 
                    alt={`QR Code visualization container for short pointer mapping ${link.shortId}`}
                    className="w-28 h-28 object-contain"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-pink-500">QR Target Vector Node</h5>
                  <p className="text-xs text-base-content/60 dark:text-zinc-400 font-medium leading-relaxed max-w-sm">
                    This vector maps standard scan requests directly into the link redirect logic pipelines. You can capture or download this asset to display on physical prints.
                  </p>
                  <div className="pt-1">
                    <a 
                      href={link.qrCodeUrl} 
                      download={`qr-${link.shortId}.png`}
                      className="btn btn-xs bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 font-bold tracking-tight text-base-content/80 normal-case rounded-md px-3 py-1 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all"
                    >
                      Download Asset Image
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LinkList;