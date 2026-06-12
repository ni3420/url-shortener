import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiEye, HiEyeOff } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpCard() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<"oauth_google" | "oauth_github" | null>(null);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const nameParts = data.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      toast.success("Verification code sent to your email.");
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string }> };
      const errorMessage = clerkError.errors?.[0]?.message || "Something went wrong during sign up.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("Account created successfully!");
        navigate("/home");
      } else {
        toast.error("Verification incomplete. Additional steps required.");
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ message: string }> };
      const errorMessage = clerkError.errors?.[0]?.message || "Invalid verification code.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "oauth_google" | "oauth_github") => {
    if (!isLoaded) return;
    setIsSocialLoading(provider);
    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/register",
        redirectUrlComplete: "/home",
      });
    } catch {
      toast.error(`Failed to initiate registration with ${provider === "oauth_google" ? "Google" : "GitHub"}`);
      setIsSocialLoading(null);
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 antialiased selection:bg-indigo-500/20 transition-colors duration-300">
      <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-white dark:bg-neutral-900/40 border-r border-neutral-200/60 dark:border-neutral-900/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5 self-start group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105 duration-300">
            <span className="text-xl font-black text-white tracking-tighter">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-600 dark:from-white dark:via-white dark:to-neutral-400 bg-clip-text text-transparent">
            Shortly
          </span>
        </div>

        <div className="w-full max-w-sm mx-auto my-auto py-10 lg:py-0">
          {!pendingVerification ? (
            <>
              <div className="flex flex-col space-y-2 mb-6 text-center sm:text-left">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                  Create an account
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Get started with your free enterprise-grade link management tool.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 h-11 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 font-medium text-sm transition-all active:scale-[0.98] disabled:opacity-50"
                  disabled={isLoading || isSocialLoading !== null || !isLoaded}
                  onClick={() => handleSocialSignUp("oauth_google")}
                >
                  {isSocialLoading === "oauth_google" ? (
                    <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin text-indigo-500" />
                  ) : (
                    <FaGoogle className="h-4 w-4 text-rose-500" />
                  )}
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 h-11 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 font-medium text-sm transition-all active:scale-[0.98] disabled:opacity-50"
                  disabled={isLoading || isSocialLoading !== null || !isLoaded}
                  onClick={() => handleSocialSignUp("oauth_github")}
                >
                  {isSocialLoading === "oauth_github" ? (
                    <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin text-indigo-500" />
                  ) : (
                    <FaGithub className="h-4 w-4 text-neutral-900 dark:text-white" />
                  )}
                  <span>GitHub</span>
                </button>
              </div>

              <div className="relative flex py-2 items-center my-4">
                <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
                <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-medium">
                  Or register secure
                </span>
                <div className="flex-grow border-t border-neutral-200 dark:border-neutral-800"></div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                <div className="w-full">
                  <label className="block mb-1 text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 uppercase pl-1">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <HiOutlineUser className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 h-5 w-5 z-10" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      disabled={isLoading || isSocialLoading !== null}
                      className={`w-full h-11 pl-11 pr-4 bg-white dark:bg-neutral-900 border text-sm rounded-xl transition-all outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 ${
                        errors.name 
                          ? "border-rose-500 dark:border-rose-500/30 bg-rose-500/5 focus:border-rose-500 focus:ring-1 focus:ring-rose-500" 
                          : "border-neutral-200 dark:border-neutral-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                      }`}
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <label className="block mb-1 text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 uppercase pl-1">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <HiOutlineMail className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 h-5 w-5 z-10" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={isLoading || isSocialLoading !== null}
                      className={`w-full h-11 pl-11 pr-4 bg-white dark:bg-neutral-900 border text-sm rounded-xl transition-all outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 ${
                        errors.email 
                          ? "border-rose-500 dark:border-rose-500/30 bg-rose-500/5 focus:border-rose-500 focus:ring-1 focus:ring-rose-500" 
                          : "border-neutral-200 dark:border-neutral-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                      }`}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <label className="block mb-1 text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 uppercase pl-1">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <HiOutlineLockClosed className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 h-5 w-5 z-10" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      disabled={isLoading || isSocialLoading !== null}
                      className={`w-full h-11 pl-11 pr-11 bg-white dark:bg-neutral-900 border text-sm rounded-xl transition-all outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 ${
                        errors.password 
                          ? "border-rose-500 dark:border-rose-500/30 bg-rose-500/5 focus:border-rose-500 focus:ring-1 focus:ring-rose-500" 
                          : "border-neutral-200 dark:border-neutral-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                      }`}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors focus:outline-none z-10"
                    >
                      {showPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.password.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <label className="block mb-1 text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 uppercase pl-1">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <HiOutlineLockClosed className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 h-5 w-5 z-10" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      disabled={isLoading || isSocialLoading !== null}
                      className={`w-full h-11 pl-11 pr-11 bg-white dark:bg-neutral-900 border text-sm rounded-xl transition-all outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 ${
                        errors.confirmPassword 
                          ? "border-rose-500 dark:border-rose-500/30 bg-rose-500/5 focus:border-rose-500 focus:ring-1 focus:ring-rose-500" 
                          : "border-neutral-200 dark:border-neutral-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                      }`}
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors focus:outline-none z-10"
                    >
                      {showConfirmPassword ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-rose-500 font-medium pl-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Secure Bot Protection Node Container */}
                <div id="clerk-captcha" className="my-2 flex justify-center lg:justify-start"></div>

                <button 
                  type="submit" 
                  className="w-full h-11 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl shadow-indigo-500/10 active:scale-[0.99] hover:opacity-95 transition-all mt-4 flex items-center justify-center tracking-wide disabled:opacity-50" 
                  disabled={isLoading || isSocialLoading !== null || !isLoaded}
                >
                  {isLoading ? (
                    <>
                      <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline ml-1">
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="flex flex-col space-y-2 mb-6 text-center sm:text-left">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                  Verify Email
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Enter the verification code sent to your inbox.
                </p>
              </div>

              <div className="w-full">
                <label className="block mb-1.5 text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-400 uppercase pl-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-11 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm rounded-xl transition-all outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full h-11 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl shadow-indigo-500/10 active:scale-[0.99] hover:opacity-95 transition-all flex items-center justify-center tracking-wide disabled:opacity-50" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Complete"
                )}
              </button>
            </form>
          )}
        </div>

        <div className="text-center lg:text-left text-xs text-neutral-400 dark:text-neutral-500 font-medium tracking-wide">
          © 2026 Shortly Inc. Enterprise grade URL management.
        </div>
      </div>

      <div className="hidden lg:col-span-7 lg:flex relative bg-neutral-950 items-center justify-center p-12 overflow-hidden border-l border-neutral-200/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />

        <div className="relative z-10 w-full max-w-2xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
          <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-2xl p-3 shadow-2xl">
            <img
              src="/img2.svg"
              alt="Shortly Analytics Preview"
              className="w-full h-auto rounded-xl object-cover opacity-90 dark:opacity-100"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}