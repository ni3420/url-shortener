import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateLinkSchema } from "@/features/dashboard/Schema";
import * as z from "zod";
import { useCreateLink } from "@/features/dashboard/api/use-CreateLink";
import { toast } from "react-hot-toast"; 

type FormValues = z.infer<typeof CreateLinkSchema>;

const Form = () => {
  const mutation = useCreateLink();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("URL shortened successfully!");
        reset();
      },
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      },
    });
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl mx-auto border border-base-200">
      <div className="card-body gap-y-6">
        <div>
          <h2 className="card-title text-2xl font-bold tracking-tight text-base-content">
            Shorten a URL
          </h2>
          <p className="text-sm text-base-content/60 mt-1">
            Enter your long URL below to create a shorter, shareable link.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="form-control gap-y-4">
          <div className="form-control w-full">
            <label htmlFor="url" className="label">
              <span className="label-text font-medium text-base-content/80">Destination URL</span>
            </label>
            <input
              id="url"
              type="text"
              placeholder="https://example.com/very-long-link"
              {...register("url")}
              className={`input input-bordered w-full text-sm transition-colors focus:input-primary ${
                errors.url ? "input-error" : ""
              }`}
            />
            {errors.url && (
              <label className="label">
                <span className="label-text-alt text-error font-medium">
                  {errors.url.message}
                </span>
              </label>
            )}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn btn-primary w-full shadow-sm mt-1.5"
          >
            {mutation.isPending ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Shortening...
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