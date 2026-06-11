"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { CreateLinkSchema } from "../Schema";
import type { CreateLinkInput } from "../Schema";
import { HiOutlineXMark, HiOutlineLink, HiOutlineExclamationCircle } from "react-icons/hi2";
// import {useGetCampaignUrls} from "../api/use-showAllcampaignLink"

interface CreateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
  campaignTitle: string;
}

const CreateLinkModal = ({ isOpen, onClose, campaignId, campaignTitle }: CreateLinkModalProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLinkInput>({
    resolver: zodResolver(CreateLinkSchema),
  });

  const createLinkMutation = useMutation({
    mutationFn: async (values: CreateLinkInput) => {
      try {
        const urlObj = new URL(values.originalUrl);
        const hasSource = urlObj.searchParams.has("utm_source");
        const hasMedium = urlObj.searchParams.has("utm_medium");
        const hasCampaign = urlObj.searchParams.has("utm_campaign");

        if (!hasSource || !hasMedium || !hasCampaign) {
          throw new Error("Target links missing valid UTM metadata structures (utm_source, utm_medium, utm_campaign).");
        }

        const res = await api.post(`/campaign/${campaignId}/links`, {
          title: values.title,
          originalUrl: values.originalUrl,
        });
        return res.data;
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["campaign", campaignId]});
      queryClient.invalidateQueries({queryKey:["campaign","links",campaignId]})
      // queryClient.invalidateQueries({ queryKey: ["campaign-details", campaignId] });
      toast.success("Short tracking pointer generated!");

      reset();
      onClose();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to append link to database architecture");
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden antialiased text-base-content">
        <div className="flex items-center justify-between p-5 border-b border-base-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
              <HiOutlineLink className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Generate Short Target Link</h3>
              <p className="text-[11px] text-base-content/50 font-medium">Injecting parameters into context: {campaignTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle text-base-content/40 hover:text-base-content">
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => createLinkMutation.mutate(data))} className="p-5 space-y-4">
          <div className="form-control w-full">
            <label className="label py-1 text-xs font-bold uppercase tracking-wide opacity-60">Link Title</label>
            <input
              type="text"
              placeholder="e.g., Summer Email Newsletter Button"
              {...register("title")}
              className="input input-bordered w-full bg-base-200/50 dark:bg-zinc-950 focus:outline-none focus:border-indigo-500 transition-all text-sm h-11"
            />
            {errors.title && <span className="text-xs text-error font-semibold mt-1">{errors.title.message}</span>}
          </div>

          <div className="form-control w-full">
            <label className="label py-1 text-xs font-bold uppercase tracking-wide opacity-60">Destination Target URL</label>
            <input
              type="text"
              placeholder="https://yourstore.com/promo?utm_source=fb&utm_medium=cpc&utm_campaign=summer"
              {...register("originalUrl")}
              className="input input-bordered w-full bg-base-200/50 dark:bg-zinc-950 focus:outline-none focus:border-indigo-500 transition-all text-sm h-11 text-indigo-500 font-medium placeholder:font-normal placeholder:text-base-content/30"
            />
            {errors.originalUrl && <span className="text-xs text-error font-semibold mt-1">{errors.originalUrl.message}</span>}
          </div>

          <div className="p-3.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-500/20 flex items-start gap-2.5">
            <HiOutlineExclamationCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h5 className="text-xs font-bold uppercase tracking-wide">Validation Enforcement Required</h5>
              <p className="text-[11px] font-medium leading-relaxed opacity-80">
                The target routing string pasted above must contain pre-built parameters matching standard definitions: <span className="font-mono bg-base-100 dark:bg-zinc-950 px-1 py-0.5 rounded border border-base-300 dark:border-zinc-800 text-[10px]">utm_source</span>, <span className="font-mono bg-base-100 dark:bg-zinc-950 px-1 py-0.5 rounded border border-base-300 dark:border-zinc-800 text-[10px]">utm_medium</span>, and <span className="font-mono bg-base-100 dark:bg-zinc-950 px-1 py-0.5 rounded border border-base-300 dark:border-zinc-800 text-[10px]">utm_campaign</span>.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-base-200 dark:border-zinc-800/80 mt-4">
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm h-10 px-4 font-bold normal-case rounded-xl text-xs">
              Cancel
            </button>
            <button
              type="submit"
              disabled={createLinkMutation.isPending}
              className="btn btn-primary btn-sm h-10 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 border-none text-white font-bold normal-case rounded-xl text-xs"
            >
              {createLinkMutation.isPending ? <span className="loading loading-spinner loading-xs" /> : "Deploy URL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLinkModal;