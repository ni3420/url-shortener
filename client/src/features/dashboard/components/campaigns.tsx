import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { utmSchema } from "../Schema";
import * as z from "zod";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Copy, Link2, RotateCcw, ExternalLink, HelpCircle } from "lucide-react";

type UtmFormValues = z.infer<typeof utmSchema>;

const CampaignsForm = () => {
  const [generatedUrl, setGeneratedUrl] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<UtmFormValues>({
    resolver: zodResolver(utmSchema),
    mode: "onChange",
    defaultValues: {
      baseUrl: "",
      source: "",
      medium: "",
      name: "",
      term: "",
      content: "",
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (!formValues.baseUrl || errors.baseUrl) {
      setGeneratedUrl("");
      return;
    }

    try {
      const url = new URL(formValues.baseUrl);
      
    //   if (formValues.source) url.searchParams.set("utm_source", formValues.source);
    //   if (formValues.medium) url.searchParams.set("utm_medium", formValues.medium);
    //   if (formValues.name) url.searchParams.set("utm_campaign", formValues.name);
    //   if (formValues.term) url.searchParams.set("utm_term", formValues.term);
    //   if (formValues.content) url.searchParams.set("utm_content", formValues.content);

      setGeneratedUrl(url.toString());
    } catch  {
      setGeneratedUrl("");
    }
  }, [formValues, errors.baseUrl]);

  const onSubmit = (data: UtmFormValues) => {
    toast.success("UTM Campaign parameters validated successfully!");
  };

  const handleCopy = async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      toast.success("Link copied to clipboard!");
    } catch  {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      
      <div className="flex items-center gap-2.5 border-b border-base-200 pb-5">
        <div className="p-2 bg-primary/10 text-primary rounded-xl">
          <Link2 size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content">UTM Campaign Builder</h1>
          <p className="text-xs text-base-content/50 mt-0.5">Add tracking parameters to your URLs to measure marketing performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-7 bg-base-100 p-5 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-4">
          
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold flex items-center gap-1.5">
                Website URL <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="https://example.com"
              className={`input input-bordered w-full rounded-xl ${errors.baseUrl ? "input-error" : ""}`}
              {...register("baseUrl")}
            />
            {errors.baseUrl && <span className="text-xs text-error mt-1">{errors.baseUrl.message}</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold flex items-center gap-1">
                  Campaign Source <span className="text-error">*</span>
                  <div className="tooltip tooltip-top text-xs font-normal normal-case" data-tip="The platform where traffic originates (e.g. google, newsletter)">
                    <HelpCircle size={14} className="text-base-content/40 cursor-help" />
                  </div>
                </span>
              </label>
              <input
                type="text"
                placeholder="google, newsletter, facebook"
                className={`input input-bordered w-full rounded-xl ${errors.source ? "input-error" : ""}`}
                {...register("source")}
              />
              {errors.source && <span className="text-xs text-error mt-1">{errors.source.message}</span>}
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-semibold flex items-center gap-1">
                  Campaign Medium <span className="text-error">*</span>
                  <div className="tooltip tooltip-top text-xs font-normal normal-case" data-tip="The advertising or marketing medium (e.g. cpc, email, banner)">
                    <HelpCircle size={14} className="text-base-content/40 cursor-help" />
                  </div>
                </span>
              </label>
              <input
                type="text"
                placeholder="cpc, email, social"
                className={`input input-bordered w-full rounded-xl ${errors.medium ? "input-error" : ""}`}
                {...register("medium")}
              />
              {errors.medium && <span className="text-xs text-error mt-1">{errors.medium.message}</span>}
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold flex items-center gap-1">
                Campaign Name <span className="text-error">*</span>
                <div className="tooltip tooltip-top text-xs font-normal normal-case" data-tip="The specific product promotion or slogan slogan identifier (e.g. summer_sale)">
                  <HelpCircle size={14} className="text-base-content/40 cursor-help" />
                </div>
              </span>
            </label>
            <input
              type="text"
              placeholder="summer_sale, launch_2026"
              className={`input input-bordered w-full rounded-xl ${errors.name ? "input-error" : ""}`}
              {...register("name")}
            />
            {errors.name && <span className="text-xs text-error mt-1">{errors.name.message}</span>}
          </div>

          <div className="divider my-1 text-xs text-base-content/30 uppercase tracking-wider font-semibold">Optional Parameters</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium flex items-center gap-1">
                  Campaign Term
                  <div className="tooltip tooltip-top text-xs normal-case" data-tip="Identify paid search keywords">
                    <HelpCircle size={14} className="text-base-content/40 cursor-help" />
                  </div>
                </span>
              </label>
              <input
                type="text"
                placeholder="marketing_keywords"
                className="input input-bordered w-full rounded-xl"
                {...register("term")}
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium flex items-center gap-1">
                  Campaign Content
                  <div className="tooltip tooltip-top text-xs normal-case" data-tip="Use to differentiate similar ads or links within the same campaign">
                    <HelpCircle size={14} className="text-base-content/40 cursor-help" />
                  </div>
                </span>
              </label>
              <input
                type="text"
                placeholder="sidebar_banner"
                className="input input-bordered w-full rounded-xl"
                {...register("content")}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end mt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                toast.success("Form cleared");
              }}
              className="btn btn-ghost btn-sm text-base-content/60 gap-1.5 rounded-lg"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary btn-sm px-5 rounded-lg"
            >
              Save Campaign
            </button>
          </div>
        </form>

        <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-4">
          <div className="bg-base-200/60 border border-base-200 rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-base-content/60">Generated Link Preview</h2>
            
            <div className="bg-base-100 p-4 rounded-xl border border-base-200 min-h-[100px] flex items-center justify-center relative group">
              {generatedUrl ? (
                <p className="text-sm font-medium text-primary break-all pr-2 select-all leading-relaxed">
                  {generatedUrl}
                </p>
              ) : (
                <p className="text-xs text-base-content/40 text-center italic">
                  Fill out the required form fields on the left to instantly generate your tracked link.
                </p>
              )}
            </div>

            <div className="flex gap-2 w-full">
              <button
                type="button"
                disabled={!generatedUrl}
                onClick={handleCopy}
                className="btn btn-outline btn-secondary btn-sm flex-1 gap-2 rounded-lg"
              >
                <Copy size={14} />
                Copy Link
              </button>
              
              <a
                href={generatedUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className={`btn btn-square btn-secondary btn-sm rounded-lg ${!generatedUrl ? "btn-disabled opacity-50" : ""}`}
                title="Test Link"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CampaignsForm;