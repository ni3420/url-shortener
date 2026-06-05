import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateLinkSchema } from "@/features/dashboard/Schema";
import * as z from "zod";
import { useCreateLink } from "@/features/dashboard/api/use-CreateLink";
import { toast } from "sonner";
import { HiOutlineLink } from "react-icons/hi2";
import { HiLink } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type FormValues = z.infer<typeof CreateLinkSchema>;

const Form = () => {
  const mutation = useCreateLink();
  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues: {
      urls: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("URL shortened successfully!");
        navigate("/links")
        reset();
      },
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      },
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-base-100 dark:bg-zinc-900 border border-base-300 dark:border-zinc-800 rounded-2xl shadow-xl shadow-base-content/5 overflow-hidden transition-all duration-300">
      <div className="p-5 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-base-200 dark:border-zinc-800 pb-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500/10 to-violet-600/10 border border-indigo-500/20 text-indigo-500 shadow-sm">
            <HiLink className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-base-content dark:text-zinc-100">
              Shorten a URL
            </h2>
            <p className="text-xs sm:text-sm text-base-content/50 dark:text-zinc-400 font-medium mt-0.5">
              Enter your destination URL below to generate a clean, tracking-ready short link.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="form-control w-full gap-1.5">
            <label htmlFor="url" className="label p-0">
              <span className="label-text text-xs sm:text-sm font-semibold text-base-content/70 dark:text-zinc-300">
                Destination URL
              </span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-base-content/40 dark:text-zinc-500 pointer-events-none">
                <HiOutlineLink className="h-5 w-5" />
              </div>
              <input
                id="url"
                type="text"
                placeholder="https://example.com/your-long-destination-link"
                disabled={mutation.isPending}
                {...register("urls")}
                className={`input input-bordered w-full h-12 pl-12 bg-base-200/30 dark:bg-zinc-950/40 border-base-300 dark:border-zinc-800 text-sm placeholder:opacity-40 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all ${
                  errors.urls? "input-error bg-error/5 border-error/50 focus:border-error" : ""
                }`}
              />
            </div>
            {errors.urls && (
              <label className="label py-0.5">
                <span className="label-text-alt text-error font-medium">
                  {errors.urls.message}
                </span>
              </label>
            )}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn btn-primary w-full h-12 min-h-[3rem] normal-case font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 border-none text-white shadow-lg shadow-indigo-500/10 active:scale-[0.99] transition-all"
          >
            {mutation.isPending ? (
              <>
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin mr-2" />
                Shortening Link...
              </>
            ) : (
              "Shorten URL"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;