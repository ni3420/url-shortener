import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<"google" | "github" | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    toast.success("Welcome back to Shortly!", {
      description: `Successfully logged in as ${data.email}`,
    });
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setIsSocialLoading(provider);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSocialLoading(null);
    
    toast.success(`Redirecting to ${provider === "google" ? "Google" : "GitHub"}...`);
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-base-100 text-base-content antialiased selection:bg-primary/20">
      <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-base-200/30 backdrop-blur-md">
        <div className="flex items-center gap-2.5 self-start group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105 duration-300">
            <span className="text-xl font-black text-white tracking-tighter">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
            Shortly
          </span>
        </div>

        <div className="w-full max-w-sm mx-auto my-auto py-10 lg:py-0">
          <div className="flex flex-col space-y-2 mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-content opacity-70">
              Enter your credentials or continue with your social accounts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="btn btn-outline gap-2 h-11 min-h-[2.75rem] bg-base-100 border-base-300 text-base-content hover:bg-base-200 hover:border-base-400 normal-case font-medium"
              disabled={isLoading || isSocialLoading !== null}
              onClick={() => handleSocialLogin("google")}
            >
              {isSocialLoading === "google" ? (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin opacity-70" />
              ) : (
                <FaGoogle className="h-4 w-4 text-rose-500" />
              )}
              <span>Google</span>
            </button>

            <button
              type="button"
              className="btn btn-outline gap-2 h-11 min-h-[2.75rem] bg-base-100 border-base-300 text-base-content hover:bg-base-200 hover:border-base-400 normal-case font-medium"
              disabled={isLoading || isSocialLoading !== null}
              onClick={() => handleSocialLogin("github")}
            >
              {isSocialLoading === "github" ? (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin opacity-70" />
              ) : (
                <FaGithub className="h-4 w-4 text-current" />
              )}
              <span>GitHub</span>
            </button>
          </div>

          <div className="divider text-xs uppercase tracking-wider opacity-50 my-6">
            Or secure login
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text text-xs font-medium opacity-80">Email Address</span>
              </label>
              <div className="relative flex items-center">
                <HiOutlineMail className="absolute left-3.5 text-base-content/50 h-5 w-5 z-10" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isLoading || isSocialLoading !== null}
                  className={`input input-bordered w-full h-11 pl-11 bg-base-100 placeholder:opacity-40 focus:outline-none ${
                    errors.email ? "input-error bg-error/5" : "focus:border-primary"
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <label className="label py-1">
                  <span className="label-text-alt text-error font-medium">{errors.email.message}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <div className="flex items-center justify-between py-1">
                <label className="label p-0">
                  <span className="label-text text-xs font-medium opacity-80">Password</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary font-medium hover:underline transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative flex items-center">
                <HiOutlineLockClosed className="absolute left-3.5 text-base-content/50 h-5 w-5 z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading || isSocialLoading !== null}
                  className={`input input-bordered w-full h-11 pl-11 pr-11 bg-base-100 placeholder:opacity-40 focus:outline-none ${
                    errors.password ? "input-error bg-error/5" : "focus:border-primary"
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-base-content/50 hover:text-base-content transition-colors focus:outline-none z-10"
                >
                  {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <label className="label py-1">
                  <span className="label-text-alt text-error font-medium">{errors.password.message}</span>
                </label>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full h-11 min-h-[2.75rem] normal-case font-medium bg-gradient-to-r from-indigo-500 to-violet-600 border-none text-white shadow-lg shadow-indigo-500/10 active:scale-[0.99] transition-all mt-2" 
              disabled={isLoading || isSocialLoading !== null}
            >
              {isLoading ? (
                <>
                  <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                  Verifying account...
                </>
              ) : (
                "Sign In with Credentials"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm opacity-80">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline ml-1">
              Sign up free
            </Link>
          </p>
        </div>

        <div className="text-center lg:text-left text-xs opacity-40 font-medium">
          © 2026 Shortly Inc. Enterprise grade URL management.
        </div>
      </div>

      <div className="hidden lg:col-span-7 lg:flex relative bg-neutral items-center justify-center p-12 overflow-hidden border-l border-base-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[6000ms]" />

        <div className="relative z-10 w-full max-w-2xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
          <div className="relative rounded-2xl border border-base-300/40 bg-base-100/10 backdrop-blur-xl p-2.5 shadow-2xl shadow-neutral-focus/50">
            <img
              src="/img2.svg"
              alt="Shortly Analytics Preview"
              className="w-full h-auto rounded-xl object-cover border border-base-300/20"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;