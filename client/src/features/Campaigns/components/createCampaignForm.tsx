
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { 
  HiOutlineTag, 
  HiOutlineDocumentText,
  HiOutlineRocketLaunch
} from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCreateCampaign } from "../api/use-createcampaign";
import { campaignSchema } from "../Schema";

interface CreateCampaignProps {
  onSuccessLaunch: () => void;
}

type CampaignFormValues = z.infer<typeof campaignSchema>;

const CreateCampaignForm = ({onSuccessLaunch}:CreateCampaignProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = useCreateCampaign();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: "",
      tag: undefined,
    },
  });

  const onSubmit = async (data: CampaignFormValues) => {
    setIsLoading(true);
    mutateAsync(data, {
      onSuccess: () => {
        toast.success("Campaign deployed successfully!");
        reset();
        onSuccessLaunch()

      },
      onError: () => {
        toast.error("Failed to deploy campaign.")
        console.log("not create");
      }
    });
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-2 py-4 sm:py-8 text-base-content antialiased">
      <div className="bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl shadow-xl shadow-base-content/5 overflow-hidden transition-all duration-300">
        <div className="p-5 sm:p-8 flex flex-col gap-6">
          
          <div className="flex items-center gap-3.5 border-b border-base-200 dark:border-zinc-800 pb-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500/10 to-violet-600/10 border border-indigo-500/20 text-indigo-500 shadow-sm">
              <HiOutlineRocketLaunch className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-base-content dark:text-zinc-100">
                New Tracking Campaign
              </h2>
              <p className="text-xs sm:text-sm text-base-content/50 dark:text-zinc-400 font-medium mt-0.5">
                Fill in the core attributes below to launch your short link deployment.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control w-full gap-1.5">
              <label htmlFor="title" className="label p-0">
                <span className="label-text text-xs sm:text-sm font-semibold text-base-content/70 dark:text-zinc-300">
                  Campaign Title
                </span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-base-content/40 dark:text-zinc-500 pointer-events-none">
                  <HiOutlineDocumentText className="h-5 w-5" />
                </div>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g., Summer Product Launch"
                  disabled={isLoading}
                  {...register("title")}
                  className={`input input-bordered w-full h-12 pl-12 bg-base-200/30 dark:bg-zinc-950/40 border-base-300 dark:border-zinc-800 text-sm placeholder:opacity-40 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all ${
                    errors.title ? "input-error bg-error/5 border-error/50 focus:border-error" : ""
                  }`}
                />
              </div>
              {errors.title && (
                <label className="label py-0.5">
                  <span className="label-text-alt text-error font-medium">{errors.title.message}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full gap-1.5">
              <label htmlFor="tag" className="label p-0">
                <span className="label-text text-xs sm:text-sm font-semibold text-base-content/70 dark:text-zinc-300">
                  Campaign Tag <span className="text-xs font-normal opacity-50">(Optional)</span>
                </span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-base-content/40 dark:text-zinc-500 pointer-events-none">
                  <HiOutlineTag className="h-5 w-5" />
                </div>
                <input
                  id="tag"
                  type="text"
                  placeholder="e.g., marketing"
                  disabled={isLoading}
                  {...register("tag")}
                  className={`input input-bordered w-full h-12 pl-12 bg-base-200/30 dark:bg-zinc-950/40 border-base-300 dark:border-zinc-800 text-sm placeholder:opacity-40 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all ${
                    errors.tag ? "input-error bg-error/5 border-error/50 focus:border-error" : ""
                  }`}
                />
              </div>
              {errors.tag && (
                <label className="label py-0.5">
                  <span className="label-text-alt text-error font-medium">{errors.tag.message}</span>
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full h-12 min-h-[3rem] normal-case font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 border-none text-white shadow-lg shadow-indigo-500/10 active:scale-[0.99] transition-all mt-4"
            >
              {isLoading ? (
                <>
                  <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin mr-2" />
                  Deploying Campaign...
                </>
              ) : (
                "Launch Campaign"
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CreateCampaignForm;